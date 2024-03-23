import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  updateBooking,
  getBookingByID,
} from "../controller/roomBooking.controller.js";

const router = express.Router();

router.post("/", createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingByID);

export default router;
