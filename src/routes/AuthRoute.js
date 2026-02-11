const express = require("express");
const AuthControllers = require("../controllers/AuthControllers")
const AuthRouter = express.Router();


AuthRouter.post("/register", AuthControllers.RegisterController);

AuthRouter.post("/login", AuthControllers.LoginController );

module.exports = AuthRouter;
