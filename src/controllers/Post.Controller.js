const PostModel = require("../models/PostModel");
const videoModel = require("../models/VideoPostModel");
const LikeModel = require("../models/LikeModel");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_SECRET_KEY,
});

async function CreatePost(req, res) {
  const { caption } = req.body;
  let userId = req.user.id;
  const Extension = req.file.originalname.split(".")[1];
  const videoFormats = [
    "mp4",
    "mov",
    "avi",
    "mkv",
    "webm",
    "flv",
    "wmv",
    "mpeg",
    "mpg",
    "3gp",
    "m4v",
    "ogg",
  ];

  if (videoFormats.includes(Extension)) {
    const file = await imageKit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: "VideoTest",
      folder: "Insta-Clone/Posts/videos",
    });

    const videoPost = await videoModel.create({
      caption: caption,
      videoUrl: file.url,
      userId,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post: videoPost,
    });
  }

  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "Insta-Clone/Posts/Images",
  });

  const post = await PostModel.create({
    caption: caption,
    imgUrl: file.url,
    userId,
  });

  res.status(201).json({
    message: "Post created successfully",
    post: post,
  });
}

async function Getpost(req, res) {
  let userId = req.user.id;
  let post = null;

  try {
    post = await PostModel.find({ userId });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: "Posts not found",
    });
  }

  res.status(200).json({
    message: "Posts fetched Succesfully",
    post: post,
  });
}

async function getPostDetails(req, res) {
  const videoId = req.params.postId;

  let userId = req.user.id;
  let post = null;

  try {
    post = await PostModel.findById(videoId);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isUserValid = post.userId.toString() === userId;

  if (!isUserValid) {
    return res.status(403).json({
      message: "Forbidden content",
    });
  }

  res.status(200).json({
    message: "Post found",
    post: post,
  });
}

async function LikePost(req, res) {
  const postId = req.params.postId;
  const userId = req.user.username;

  try {
    const isPostExist = await PostModel.findOne({ _id: postId });
  } catch (err) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isAlreadyLiked = await LikeModel.findOne({
    postId: postId,
    likedBy: userId,
  });

  if (isAlreadyLiked) {
    return res.status(409).json({
      message: "Post already Liked",
    });
  }

  const likePost = await LikeModel.create({
    postId: postId,
    likedBy: userId,
  });

  res.status(200).json({
    message: "Liked successfully",
  });
}

module.exports = {
  CreatePost,
  Getpost,
  getPostDetails,
  LikePost,
};
