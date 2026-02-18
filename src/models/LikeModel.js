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
    status:{
        type:String,
        default:"pending",
        enum:{
            values:["pending","accepted","rejected" ],
                message:"status can only be pending, accepted or rejected"
        }
    }
},{
    timestamps:true
})

LikeSchema.index({postId:1,likedBy:1},{unique:true});
const LikeModel = mongoose.model("Likes",LikeSchema);

module.exports = LikeModel;