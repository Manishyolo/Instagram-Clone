const express = require("express")
const app = express();
const AuthRoute = require("./routes/AuthRoute");
app.use(express.json());

app.use("/api/user",AuthRoute);

module.exports = app;