const FollowModel = require("../models/FollowModel");


async function followController(req,res){
       const FollowerId = req.user.id;
       const FollowingId = req.params.followingId;

       console.log("followerId"+":"+FollowerId,"followingId"+":"+FollowingId)

       if(FollowerId === FollowingId){
        return res.status(400).json({ message: "You can't follow yourself" });
       }

       const follow = await FollowModel.create({
        follower:FollowerId,
        following:FollowingId
       })

       return res.status(200).json({message:"Followed Succesfully"})
}

async function unfollowController(req,res){
       const FollowerId = req.user.id;
       const FollowingId = req.params.followingId;

      

     

       const follow = await FollowModel.findOneAndDelete({
        follower:FollowerId,
        following:FollowingId
       })

       return res.status(200).json({message:"Unfollowed Succesfully"})
}


module.exports = {followController,unfollowController};