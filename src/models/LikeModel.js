const mongoose = require("mongoose");


const LikeSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required:true
    },
    likedBy:{
        type:String
    },
  
},{
    timestamps:true
})

LikeSchema.index({postId:1,likedBy:1},{unique:true});
const LikeModel = mongoose.model("Likes",LikeSchema);

module.exports = LikeModel;