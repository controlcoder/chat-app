import express from "express";
import {
  userLogin,
  userRegister,
  logout,
  getUser,
  updateProfile
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/middleware.js";

const authRouter = express.Router();

authRouter.post("/register", userRegister);
authRouter.post("/login", userLogin);

authRouter.post("/logout", logout);

authRouter.get("/check", authMiddleware, getUser);

authRouter.put("/update-profile", authMiddleware, updateProfile);

export default authRouter;
