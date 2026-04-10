import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"user",
      required: [true, "receiver id is required for sending a message"],
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"user",
      required: [true, "sender id is required for receiving a message"],
    },
    text: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const messageModel = mongoose.model("message", messageSchema);

export default messageModel;