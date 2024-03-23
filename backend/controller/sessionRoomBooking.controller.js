import mongoose from "mongoose";
import { tryCatch } from "../utils/tryCatchWrapper.js";
import { CustomError } from "../exceptions/baseException.js";
import SessionRoomBooking from "../models/sessionRoomBooking.model.js";

const ObjectId = mongoose.Types.ObjectId;

const getSessionRoomBookings = tryCatch(async (req, res) => {
  const bookings = await SessionRoomBooking.find();

  if (!bookings.length) throw new CustomError("No bookings yet!", 404);

  res.status(200).json(bookings);
});

const removeSessionRoomBooking = tryCatch(async (req, res) => {
  const isValidObjectId = ObjectId.isValid(req.params.id);

  if (!isValidObjectId) throw new CustomError("Resource not found!", 404);

  const deletedBooking = await SessionRoomBooking.findByIdAndDelete(
    req.params.id
  );

  if (!deletedBooking) throw new CustomError("Booking not found!", 404);

  res.status(200).json(deletedBooking);
});

export { getSessionRoomBookings, removeSessionRoomBooking };
