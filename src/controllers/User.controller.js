const FollowModel = require("../models/FollowModel");
const UserModel = require("../models/userModel");

async function followController(req, res) {
  const FollowerUsername = req.user.username;
  const FollowingUsername = req.params.username;

  if (FollowerUsername === FollowingUsername) {
    return res.status(400).json({ message: "You can't follow yourself" });
  }

  const IsUserExist = await UserModel.findOne({
    username: FollowingUsername,
  });

  if (!IsUserExist) {
    return res.status(404).json({
      message: "This User Does Not Exist",
    });
  }

  const IsAlreadyFollowing = await FollowModel.findOne({
    follower: FollowerUsername,
    following: FollowingUsername,
  });

  if (IsAlreadyFollowing) {
    return res.status(409).json({
      message: "You Already Follow this User",
    });
  }

  const follow = await FollowModel.create({
    follower: FollowerUsername,
    following: FollowingUsername,
  });

  return res.status(200).json({ message: "Followed Succesfully" });
}

async function unfollowController(req, res) {
  const FollowerUsername = req.user.username;
  const FollowingUsername = req.params.username;

  const follow = await FollowModel.findOneAndDelete({
    follower: FollowerUsername,
    following: FollowingUsername,
  });

  return res.status(200).json({ message: "Unfollowed Succesfully" });
}

async function FollowRequsetList(req, res) {
  const username = req.user.username;

  const follow_request_list = await FollowModel.find({
    following: username,
    status: "pending",
  });

  console.log(follow_request_list);
  if (follow_request_list.length === 0) {
    return res.status(404).json({
      message: "No follow request found",
    });
  }

  res.status(200).json({
    message: "Follow request fetched",
    follow_request_list: follow_request_list,
  });
}

async function accepteFollowRequest(req, res) {
  const username = req.user.username;
  const FollowRequestId = req.params.followrequestId;
  const status = req.params.status;
  let FollowRequest;

  console.log(FollowRequestId);
  try {
    FollowRequest = await FollowModel.findOne({
      _id: FollowRequestId,
      following: username,
      status: "pending",
    });

    console.log(FollowRequest);
  } catch (error) {
    res.status(404).json({
      message: "Follow request not found",
    });
  }

  const IsAlreadyAcceptedRequest = await FollowModel.findOne({
    _id: FollowRequestId,
    following: username,
    status: "accepted",
  });

  if (IsAlreadyAcceptedRequest) {
    return res.status(409).json({
      message: "You already Accepted this follow request",
    });
  }

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status",
    });
  }

  FollowRequest.status = status;
  await FollowRequest.save();

  res.status(200).json({
    message: `Follow request ${status}`,
  });
}

module.exports = {
  followController,
  unfollowController,
  accepteFollowRequest,
  FollowRequsetList,
};
