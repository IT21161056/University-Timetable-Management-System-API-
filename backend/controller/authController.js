import { CustomError } from "../exceptions/baseException.js";
import User from "../models/userModel.js";
import { io } from "../server.js";
import generateToken from "../utils/generateToken.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";

const authUser = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new CustomError("Invalid email or password");
  }
});

const registerUser = tryCatch(async (req, res, next) => {
  const { name, email, mobile, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new CustomError("User already exists");
  }

  const user = await User.create({
    name,
    email,
    mobile,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    io.emit("register", { user });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    throw new CustomError("Invalid user data", 400);
  }
});

const logoutUser = tryCatch(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "User logged out" });
});

//get user details
const getUserProfile = tryCatch(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json(user);
  } else {
    throw new CustomError("User not found", 404);
  }
});

//get all user profiles
const getAllProfiles = tryCatch(async (_, res) => {
  const users = await User.find({});
  res.json(users);
});

//update profile
const updateUserProfile = tryCatch(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
    });
  } else {
    res.status(404);
    throw new CustomError("User not found");
  }
});

const deleteUserProfile = tryCatch(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User profile deleted" });
  } else {
    res.status(404);
    throw new CustomError("User not found");
  }
});

const deleteUser = tryCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne({ _id: user._id });

    res.status(200).json({ message: "User deleted" });
  } else {
    res.status(404);
    throw new CustomError("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getAllProfiles,
  updateUserProfile,
  deleteUserProfile,
  deleteUser,
};
