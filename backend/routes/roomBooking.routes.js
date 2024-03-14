const express = require("express");
const router = express.Router();
const {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
} = require("../controller/roomBooking.controller");

// Route for creating a booking
router.post("/", createBooking);

// Route for updating a booking
router.put("/:id", updateBooking);

// Route for deleting a booking
router.delete("/:id", deleteBooking);

// Route for getting all bookings
router.get("/", getAllBookings);

// Route for getting a booking by ID
router.get("/:id", getBookingById);

module.exports = router;
