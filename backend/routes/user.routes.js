const express = require("express");
const router = express.Router();
const {
  createNewUser,
  deleteUser,
  getAllUsers,
  loginUser,
  resetLeaveCount,
  updateUser,
  viewDetails,
} = require("../controller/user.controller");

router.route("/signup").post(createNewUser);

module.exports = router;
