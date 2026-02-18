const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema({
    follower:{
        type:String,
        ref:"users",
        required:true
    },
    following:{
        type:String,
        ref:"users",
        required:true,
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
FollowSchema.index({follower:1,following:1},{unique:true});

const FollowModel = mongoose.model("Follow",FollowSchema);

module.exports = FollowModel;