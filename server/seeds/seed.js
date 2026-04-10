import mongoose from "mongoose";

import { messagesDummyData } from "./message.data.js";
import { userDummyData } from "./user.data.js";
import messageModel from "../src/models/message.model.js";
import userModel from "../src/models/user.model.js";

const MONGO_URI = "mongodb://localhost:27017/chat-app-practice";

let isConnected = false;
async function connectToDB() {
  try {
    if (isConnected) {
      console.log("mongo already connected");
      return;
    }

    const db = await mongoose.connect(MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log("db connected");
  } catch (err) {
    console.log("mongodb connection failed", err);
    process.exit(1);
  }
}

const seedMessages = async () => {
  const existing = await messageModel.countDocuments();
  if (existing > 0) {
    console.log("messages already seeded");
    return;
  }
  await messageModel.insertMany(messagesDummyData);
  console.log("messages seeded");
};

const seedUsers = async () => {
  const existing = await userModel.countDocuments();
  if (existing > 0) {
    console.log("users already seeded");
    return;
  }
  await userModel.insertMany(userDummyData);
  console.log("users seeded");
};

const seed = async () => {
  try {
    await connectToDB();
    await seedUsers();
    await seedMessages();

    console.log("seeding completed");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seed();
