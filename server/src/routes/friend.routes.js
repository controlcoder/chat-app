import express from "express";
import { authMiddleware } from "../middleware/middleware.js";
import { acceptFriendRequest, rejectFriendRequest, sendFriendRequest } from "../controllers/friend.controller.js";
const friendRouter = express.Router();

friendRouter.post("/add", authMiddleware, sendFriendRequest);
friendRouter.put("/request/accept", authMiddleware, acceptFriendRequest);
friendRouter.put("/request/remove", authMiddleware, rejectFriendRequest);

export default friendRouter;
