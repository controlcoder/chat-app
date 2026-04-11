import { io, userSocketMap } from "../app.js";
import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js";

export const getUsersForSidebar = async (req, res, next) => {
  try {
    const user = req.user;
    // const filteredUsers = await userModel
    //   .find({ _id: { $ne: user._id } })
    //   .select("-__v");

    const filteredUsers = await userModel
      .findById(user._id)
      .populate("friends")
      .select("-__v");

    const unseenMessages = {};

    const promises = filteredUsers?.friends.map(async (sideUser) => {
      const messages = await messageModel.find({
        senderId: sideUser._id,
        receiverId: user._id,
        seen: false,
      });
      if (messages.length > 0) unseenMessages[sideUser._id] = messages.length;
    });

    await Promise.all(promises);

    return res.json({
      success: true,
      message: "all users retrieved",
      users: filteredUsers?.friends,
      unseenMessages,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserMessage = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { selectedUserId } = req.params;

    const messages = await messageModel.find({
      $or: [
        { receiverId: userId, senderId: selectedUserId },
        { senderId: userId, receiverId: selectedUserId },
      ],
    });
    await messageModel.updateMany(
      { senderId: selectedUserId, receiverId: userId },
      { $set: { seen: true } },
    );

    return res.json({
      success: true,
      message: "all message retrieved",
      messages,
    });
  } catch (err) {
    next(err);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { selectedUserId } = req.params;

    const { text } = req.body;

    const newMessage = await messageModel.create({
      receiverId: selectedUserId,
      senderId: userId,
      text,
    });

    const receiverSocketId = userSocketMap[selectedUserId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.json({ message: "message sent", success: true, newMessage });
  } catch (err) {
    next(err);
  }
};

export const markMessageSeen = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    await messageModel.findOneAndUpdate(messageId, { seen: true });
    return res.json({ message: "message seen", success: true });
  } catch (err) {
    next(err);
  }
};
