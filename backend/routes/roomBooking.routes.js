import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
} from "../controller/roomBooking.controller.js";

const router = express.Router();

router.post("/", createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);

export default router;
