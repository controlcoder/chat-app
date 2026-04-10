import cloudinary from "../config/cloudinary.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

/**
 * - user | admin register controller
 * - POST api/auth/register
 */

export const userRegister = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "invalid details" });
    }

    const isExists = await userModel.findOne({ email });
    if (isExists)
      return res.status(409).json({
        success: false,
        message: "user already exists with this email",
      });

    const user = await userModel.create({
      email,
      password,
      name,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * - user | admin login controller
 * - POST api/auth/login
 */

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel
      .findOne({ email })
      .select("email name password")
      .populate("friends", "name email profilePic -_id")
      .populate("friendRequestsSent", "name email profilePic -_id")
      .populate("friendRequestsReceived", "name email profilePic -_id");
    if (!user)
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });

    // const isValidPassword = await user.comparePassword(password);

    const isValidPassword = password === user.password;

    if (!isValidPassword)
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    return res.json({
      success: true,
      message: "user logged in",
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.json({ success: true, message: "user logged out" });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = req.user;
    return res.json({
      success: true,
      message: "user info retrieved",
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { profilePic, name } = req.body;

    const userId = req.user._id;
    let updatedUser;

    if (!profilePic) {
      updatedUser = await userModel
        .findByIdAndUpdate(userId, { name }, { returnDocument: "after" })
        .select("name email profilePic")
        .lean();
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);
      updatedUser = await userModel
        .findByIdAndUpdate(
          userId,
          {
            profilePic: upload.secure_url,
            name,
          },
          { returnDocument: "after" },
        )
        .select("name email profilePic")
        .lean();
    }
    return res.json({
      success: true,
      user: updatedUser,
      message: "user profile updated",
    });
  } catch (err) {
    next(err);
  }
};
