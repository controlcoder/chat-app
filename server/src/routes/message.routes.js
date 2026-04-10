import express from "express";
import { authMiddleware } from "../middleware/middleware.js";
import { getUserMessage, getUsersForSidebar, markMessageSeen, sendMessage } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/users", authMiddleware, getUsersForSidebar);
messageRouter.get("/:selectedUserId", authMiddleware, getUserMessage);
messageRouter.post("/send/:selectedUserId", authMiddleware, sendMessage);
messageRouter.post("/mark/:messageId", authMiddleware, markMessageSeen);

export default messageRouter;
