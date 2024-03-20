import express from "express";
import {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  getAllProfiles,
  updateUserProfile,
  deleteUserProfile,
  deleteUser,
} from "../controller/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth", authUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.get("/allProfiles", protect, getAllProfiles);
router.put("/profile", protect, updateUserProfile);
router.delete("/profile", protect, deleteUserProfile);
router.delete("/:id", deleteUser);

export default router;
