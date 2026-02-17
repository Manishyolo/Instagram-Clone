const express = require("express");
const AuthMiddleware = require("../middleware/AuthMiddleware")
const UserController = require("../controllers/User.controller");
const UserRouter = express.Router();




UserRouter.post("/follow/:followingId",AuthMiddleware,UserController.followController)
UserRouter.post("/unfollow/:unfollowingId",AuthMiddleware,UserController.unfollowController)



module.exports = UserRouter;