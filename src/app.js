const express = require("express")
const app = express();
var cookieParser = require('cookie-parser')
const AuthRoute = require("./routes/Auth.Route");
const PostRoute = require("./routes/Post.route");

app.use(express.json());
app.use(cookieParser());

app.use("/api/user",AuthRoute);
app.use("/api/post",PostRoute);

module.exports = app;