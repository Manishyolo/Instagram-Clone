const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    following:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    }
},{
        timestamps:true
    })
FollowSchema.index({follower:1,following:1},{unique:true});

const FollowModel = mongoose.model("Follow",FollowSchema);

module.exports = FollowModel;