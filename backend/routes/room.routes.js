import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
} from "../controller/room.controller.js";

const router = express.Router();

router.post("/", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.get("/", getAllRooms);
router.get("/:id", getRoomById);

export default router;
