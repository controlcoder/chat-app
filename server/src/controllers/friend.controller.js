import userModel from "../models/user.model.js";

export const sendFriendRequest = async (req, res, next) => {
  try {
    const { newFriend } = req.body;

    const user = req.user;

    const friendUser = await userModel.findOne({ email: newFriend });

    if (!friendUser || user._id === friendUser._id) {
      return res.status(404).json({ success: false, error: "user not found" });
    }

    await userModel.findByIdAndUpdate(
      user._id,
      {
        $push: {
          friendRequestsSent: friendUser._id,
        },
      },
      { returnDocument: "after" },
    );

    await userModel.findByIdAndUpdate(
      friendUser._id,
      {
        $push: {
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
