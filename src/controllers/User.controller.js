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
        following:FollowingUsername,
     
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
async function accepteFollowRequest(req,res){
       const userId = req.user.id;
       const FollowRequestId = req.params.followrequestId;
       const status = req.params.status;
       let isFollowRequestExist = null;        

       try {
               isFollowRequestExist = await FollowModel.findOne({
              following:userId,
              status:"pending"
       })
              
       } catch (error) {
          res.status(404).json({
              message:"Follow request not exist"
          })
       }
      
       if(userId !== isFollowRequestExist.following){
              return res.status(403).json({
                     message:"Not authorized"
              })
       }

       if(status === "accepted"){
              isFollowRequestExist.status = status;
              await isFollowRequestExist.save();
       }
        
        res.status(200).json({
      message: `Follow request ${status}`
    });
       

}


module.exports = {followController,unfollowController};