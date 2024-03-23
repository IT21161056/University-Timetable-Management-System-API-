import express from "express";
const router = express.Router();
import {
  getSessionRoomBookings,
  removeSessionRoomBooking,
} from "../controller/sessionRoomBooking.controller.js";

router.route("/").get(getSessionRoomBookings);
router.route("/").delete(removeSessionRoomBooking);

export default router;
