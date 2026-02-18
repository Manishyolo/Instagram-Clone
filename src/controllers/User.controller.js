const FollowModel = require("../models/FollowModel");
const UserModel = require("../models/userModel");

async function followController(req,res){
       const FollowerUsername = req.user.username;
       const FollowingUsername = req.params.username;


       if(FollowerUsername === FollowingUsername){
        return res.status(400).json({ message: "You can't follow yourself" });
       }
       
       const IsUserExist = await UserModel.findOne({
              username:FollowingUsername
       });
       
       if(!IsUserExist){
              return res.status(404).json({
                     message:"This User Does Not Exist"
              })
       }


       const IsAlreadyFollowing = await FollowModel.findOne({
                 follower:FollowerUsername,
        following:FollowingUsername
       })

       if(IsAlreadyFollowing){
              return res.status(409).json({
                     message:"You Already Follow this User"
              })
       }
       
       const follow = await FollowModel.create({
        follower:FollowerUsername,
        following:FollowingUsername
       })

       return res.status(200).json({message:"Followed Succesfully"})
}

async function unfollowController(req,res){
      const FollowerUsername = req.user.username;
       const FollowingUsername = req.params.username;

      

     

       const follow = await FollowModel.findOneAndDelete({
        follower:FollowerUsername,
        following:FollowingUsername
       })

       return res.status(200).json({message:"Unfollowed Succesfully"})
}


module.exports = {followController,unfollowController};