const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true,"imgUrl is required"]
    },
    userId:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"userId is required"]
    }
})

const postModel = mongoose.model("post",postSchema);

module.exports = postModel;