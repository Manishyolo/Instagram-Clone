const express = require("express");;
const PostRouter = express.Router();
const PostController = require("../controllers/Post.Controller");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const multer = require("multer");
const upload = multer({storage:multer.memoryStorage()})


PostRouter.post("/create",AuthMiddleware,upload.single("image"),PostController.CreatePost);

PostRouter.get("/getpost",AuthMiddleware,PostController.Getpost);

PostRouter.get("/:postId",AuthMiddleware,PostController.getPostDetails)


PostRouter.post("/like/:postId",AuthMiddleware,PostController.LikePost)

module.exports = PostRouter;