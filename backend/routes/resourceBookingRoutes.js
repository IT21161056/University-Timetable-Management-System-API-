const express = require("express");
const router = express.Router();
const resourceBookingController = require("../controllers/resourceBookingController");

// Route to create a new resource booking
router.post("/", resourceBookingController.createResourceBooking);

// Route to get a resource booking by ID
router.put("/:id", resourceBookingController.updateResourceBooking);

// Route to get all resource bookings
router.get("/", resourceBookingController.getAllResourceBookings);

// Route to get a resource booking by ID
router.get("/:id", resourceBookingController.getResourceBookingById);

// Route to delete a resource booking by ID
router.delete("/:id", resourceBookingController.deleteResourceBooking);

module.exports = router;
