import mongoose from "mongoose";

let isConnected = false;
async function connectToDB() {
  try {
    if (isConnected) return;

  const db = await mongoose.connect(process.env.MONGO_URI);
  isConnected = db.connections[0].readyState;
  console.log("db connected");
  } catch (err) {
    console.log("mongodb connection failed", err);
    process.exit(1);
  }
}
export default connectToDB;
