import userModel from "../models/user.model.js";

export const sendFriendRequest = async (req, res, next) => {
  try {
    const { newFriend } = req.body;

    const user = req.user;

    const friendUser = await userModel.findOne({ email: newFriend });

    if (!friendUser) {
      return res.status(404).json({ success: false, error: "user not found" });
    }

    if (user.id === friendUser.id) {
      return res.status(409).json({
        success: false,
        error: "you can't sent friend request to yourself",
      });
    }

    const existingUser = await userModel.findById(user._id);

    console.log(existingUser.friends);

    if (existingUser.friends.includes(friendUser._id)) {
      return res.status(400).json({
        success: false,
        error: `${friendUser.name} is already in your friends list`,
      });
    }

    console.log(existingUser.friendRequestsSent);

    if (existingUser.friendRequestsSent.includes(friendUser._id)) {
      return res
        .status(400)
        .json({ success: false, error: "Request already sent" });
    }

    await userModel.findByIdAndUpdate(
      user._id,
      {
        $addToSet: {
          friendRequestsSent: friendUser._id,
        },
      },
      { returnDocument: "after" },
    );

    await userModel.findByIdAndUpdate(
      friendUser._id,
      {
        $addToSet: {
          friendRequestsReceived: user._id,
        },
      },
      { returnDocument: "after" },
    );

    return res.json({ success: true, message: "friend request sent" });
  } catch (err) {
    next(err);
  }
};

export const acceptFriendRequest = async (req, res, next) => {
  try {
    const user = req.user;
    const { newFriendId } = req.body;

    const friend = await userModel.findOneAndUpdate(
      { _id: newFriendId, friendRequestsSent: user._id },
      {
        $pull: {
          friendRequestsSent: user._id,
        },
        $addToSet: {
          friends: user._id,
        },
      },
      { returnDocument: "after" },
    );

    if (!friend) {
      return res.status(400).json({
        success: false,
        error: "No friend request found",
      });
    }

    await userModel.findOneAndUpdate(
      { _id: user._id, friendRequestsReceived: newFriendId },
      {
        $pull: {
          friendRequestsReceived: newFriendId,
        },
        $addToSet: {
          friends: newFriendId,
        },
      },
    );
    return res.json({
      success: true,
      message: `${friend.name} added to friend list`,
    });
  } catch (err) {
    next(err);
  }
};

export const rejectFriendRequest = async (req, res, next) => {
  try {
    const user = req.user;
    const { newFriendId } = req.body;

    const friend = await userModel.findOneAndUpdate(
      { _id: newFriendId, friendRequestsSent: user._id },
      {
        $pull: {
          friendRequestsSent: user._id,
        },
      },
      { returnDocument: "after" },
    );

    if (!friend) {
      return res.status(400).json({
        success: false,
        error: "No friend request found",
      });
    }

    await userModel.findOneAndUpdate(
      { _id: user._id, friendRequestsReceived: newFriendId },
      {
        $pull: {
          friendRequestsReceived: newFriendId,
        },
      },
    );
    return res.json({
      success: true,
      message: `${friend.name} removed from friend request list`,
    });
  } catch (err) {
    next(err);
  }
};
