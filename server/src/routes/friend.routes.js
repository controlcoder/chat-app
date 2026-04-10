import express from "express";
import { authMiddleware } from "../middleware/middleware.js";
import { sendFriendRequest } from "../controllers/friend.controller.js";
const friendRouter = express.Router();

friendRouter.post("/add", authMiddleware, sendFriendRequest);

export default friendRouter;
