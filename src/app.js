const express = require("express")
const app = express();
const AuthRoute = require("./routes/Auth.Route");
const PostRoute = require("./routes/Post.route");

app.use(express.json());

app.use("/api/user",AuthRoute);
app.use("/api/post",PostRoute);

module.exports = app;