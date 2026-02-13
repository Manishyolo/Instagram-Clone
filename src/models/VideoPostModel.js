const mongoose = require("mongoose");


const VideoSchema = new mongoose.Schema({
   caption:{
           type:String,
           default:""
       },
       videoUrl:{
           type:String,
           required:[true,"videoUrl is required"]
       },
       userId:{
           ref:"users",
           type:mongoose.Schema.Types.ObjectId,
           required:[true,"userId is required"]
       }
})

const videoModel = mongoose.model("videos",VideoSchema)

module.exports = videoModel