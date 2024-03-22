import express from "express";
const router = express.Router();
import {
  getBookings,
  removeBooking,
} from "../controller/sessionRoomBooking.controller.js";

router.route("/").get(getBookings);
router.route("/").delete(removeBooking);

export default router;
