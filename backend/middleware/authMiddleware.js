import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  try {
    token = req.cookies.jwt;

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, user not found");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const checkRole = (role) => {
  return (req, res, next) => {
    try {
      if (!req.user || req.user.role !== role) {
        res.status(403);
        throw new Error(`Not authorized, ${role} role required`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
