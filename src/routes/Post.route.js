const express = require("express");;
const PostRouter = express.Router();
const PostController = require("../controllers/Post.Controller");
const multer = require("multer");
const upload = multer({storage:multer.memoryStorage()})


PostRouter.post("/create",upload.single("image"),PostController.CreatePost);



module.exports = PostRouter;