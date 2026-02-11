const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDb;