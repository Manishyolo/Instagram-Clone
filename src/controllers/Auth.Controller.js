const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const RegisterController = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserExisted = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExisted) {
    return res.status(409).json({
      message:
        isUserExisted.email === email
          ? "user already exisit by this email"
          : "user already exisit by this username",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(201).json({
    message: "user created succefully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
    },
    token,
  });
};

const LoginController = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(409).json({
      message: "User not found",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "user Login successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
    },
    token: token,
  });
};

module.exports = {
  RegisterController,
  LoginController,
};
