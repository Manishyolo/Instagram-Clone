const PostModel = require("../models/PostModel");
const videoModel = require("../models/VideoPostModel");
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
  let userId = null;
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

  try {
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    userId = decodedToken.id;
  } catch (error) {
    return res.status(401).json({
      message: "Unauthroized access",
    });
  }

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

module.exports = {
  CreatePost,
};
