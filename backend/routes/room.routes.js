const express = require("express");
const router = express.Router();
const {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
} = require("../controller/room.controller");

// Route for creating a room
router.post("/", createRoom);

// Route for updating a room
router.put("/:id", updateRoom);

// Route for deleting a room
router.delete("/:id", deleteRoom);

// Route for getting all rooms
router.get("/", getAllRooms);

// Route for getting a room by ID
router.get("/:id", getRoomById);

module.exports = router;
