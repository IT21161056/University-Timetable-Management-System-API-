import RoomBooking from "../models/roomBooking.model.js";
import SessionRoomBooking from "../models/sessionRoomBooking.model.js";
import Timetable from "../models/newTimetable.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";
import { CustomError } from "../exceptions/baseException.js";

const createBooking = tryCatch(async (req, res) => {
  const { userID, roomID, reason, day, startTime, endTime } = req.body;
});

const updateBooking = tryCatch(async (req, res) => {});

const deleteBooking = tryCatch(async (req, res) => {});

const getAllBookings = tryCatch(async (req, res) => {});

const getBookingByID = tryCatch(async (req, res) => {});

export {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingByID,
  updateBooking,
};
