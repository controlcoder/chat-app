import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" "[1]);
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized access, token is missing",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel
      .findById(decoded.userId)
      .populate("friends")
      .populate("friendRequestsSent")
      .populate("friendRequestsReceived");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    req.user = user;
    return next();
  } catch (err) {
    next(err);
  }
};
