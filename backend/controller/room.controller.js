import Room from "../models/room.model.js";
import Notification from "../models/notification.model.js";
import User from "../models/userModel.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";
import { CustomError } from "../exceptions/baseException.js";
import { io } from "../server.js";

// Controller for creating a room
const createRoom = tryCatch(async (req, res) => {
  const { roomName, building, floor, capacity } = req.body;

  if (!roomName || !building || !floor || !capacity)
    throw new CustomError("All fields are required!", 500);

  const savedRoom = await Room.create({
    roomName,
    building,
    floor,
    capacity,
  });

  // const users = await User.find();

  // const notifications = users.map((user) => {
  //   return new Notification({
  //     userID: user._id,
  //     message: `A new room "${roomName}" has been created in building ${building}`,
  //   });
  // });

  // notifications = await Notification.insertMany(notifications);

  // if (notifications) {
  //   io.emit("notification", { data: notifications });
  // }

  res.status(201).json(savedRoom);
});

// Controller for updating a room
const updateRoom = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { roomName, building, floor, capacity } = req.body;
  const updatedRoom = await Room.findByIdAndUpdate(
    id,
    {
      roomName,
      building,
      floor,
      capacity,
    },
    { new: true }
  );

  // Fetch all users
  const users = await User.find();

  // Create notifications for each user
  const notifications = users.map((user) => {
    return new Notification({
      userID: user._id,
      message: `Room "${roomName}" in building ${building} has been updated`,
    });
  });

  // Save notifications to database
  await Notification.insertMany(notifications);

  res.json(updatedRoom);
});

// Controller for deleting a room
const deleteRoom = tryCatch(async (req, res) => {
  const { id } = req.params;
  const room = await Room.findByIdAndDelete(id);
  if (!room) {
    throw new CustomError({ message: "Room not found" });
  }

  // const users = await User.find();

  // const notifications = users.map((user) => {
  //   return new Notification({
  //     userID: user._id,
  //     message: `Room "${room.roomName}" in building ${room.building} has been deleted`,
  //   });
  // });

  // await Notification.insertMany(notifications);

  res.json({ message: "Room deleted!" });
});

// Controller for getting all rooms
const getAllRooms = tryCatch(async (req, res) => {
  const rooms = await Room.find();

  if (!rooms.length) throw new CustomError({ message: "No rooms!" });

  res.json(rooms);
});

// Controller for getting a room by ID
const getRoomById = tryCatch(async (req, res) => {
  const { id } = req.params;
  const room = await Room.findById(id);
  if (!room) {
    throw new CustomError({
      message: "Room not found",
      status: 404,
      type: "Error.NotFound",
    });
  }
  res.json(room);
});

export { createRoom, updateRoom, deleteRoom, getAllRooms, getRoomById };
