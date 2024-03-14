const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  getAllProfiles,
  updateUserProfile,
  deleteUserProfile,
} = require("../controller/authController");
const { protect, checkAdminRole } = require("../middleware/authMiddleware");

router.post("/auth", authUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.get("/allProfiles", protect, getAllProfiles);
router.put("/profile", protect, updateUserProfile);
router.delete("/profile", protect, deleteUserProfile);

module.exports = router;
