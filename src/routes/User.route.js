const express = require("express");
const AuthMiddleware = require("../middleware/AuthMiddleware")
const UserController = require("../controllers/User.controller");
const UserRouter = express.Router();




UserRouter.post("/follow/:username",AuthMiddleware,UserController.followController)
UserRouter.post("/unfollow/:username",AuthMiddleware,UserController.unfollowController)



module.exports = UserRouter;