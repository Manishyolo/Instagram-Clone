const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already taken"],
    require: true,
  },
  email: {
    type: String,
    unique: [true, "Email already exisit"],
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
    default: "Hey there i am using insta clone",
  },
  profile_img: {
    type: String,
    default:
      "https://res.cloudinary.com/dqazvlsdd/image/upload/v1748959555/person_12259264_ak7k7q.png",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
