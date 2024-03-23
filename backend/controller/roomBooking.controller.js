import RoomBooking from "../models/roomBooking.model.js";
import SessionRoomBooking from "../models/sessionRoomBooking.model.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";
import { CustomError } from "../exceptions/baseException.js";
import { getDayOfWeek } from "../utils/utilFunctions.js";

const createBooking = tryCatch(async (req, res) => {
  const { userID, roomID, reason, day, startTime, endTime } = req.body;

  const alreadyAllocateToSession = await SessionRoomBooking.findOne({
    roomID,
    day: getDayOfWeek(day),
    $or: [
      {
        $and: [
          { startTime: { $lte: startTime } },
          { endTime: { $gte: startTime } },
        ],
      },
      {
        $and: [
          { startTime: { $lte: endTime } },
          { endTime: { $gte: endTime } },
        ],
      },
    ],
  });

  if (alreadyAllocateToSession) {
    return res
      .status(400)
      .json({ message: "There is a conflicting booking at the same time" });
  }

  // Check if room is available in timetable
  const bookingConflict = await RoomBooking.findOne({
    roomID,
    day,
    $or: [
      {
        $and: [
          { startTime: { $lte: startTime } },
          { endTime: { $gte: startTime } },
        ],
      },
      {
        $and: [
          { startTime: { $lte: endTime } },
          { endTime: { $gte: endTime } },
        ],
      },
    ],
  });

  if (bookingConflict) {
    return res
      .status(400)
      .json({ message: "There is a conflicting booking at the same time" });
  }

  const newBooking = await RoomBooking.create({
    userID,
    roomID,
    reason,
    day,
    startTime,
    endTime,
  });

  if (!newBooking) throw new CustomError("Booking fail!", 500);

  res.status(201).json(newBooking);
});

const updateBooking = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { userID, roomID, reason, day, startTime, endTime } = req.body;

  const bookingConflict = await RoomBooking.findOne({
    roomID,
    day,
    $or: [
      {
        $and: [
          { startTime: { $lte: startTime } },
          { endTime: { $gte: startTime } },
        ],
      },
      {
        $and: [
          { startTime: { $lte: endTime } },
          { endTime: { $gte: endTime } },
        ],
      },
    ],
    _id: { $ne: id }, // Exclude the current booking from the conflict check
  });

  if (bookingConflict) {
    return res
      .status(400)
      .json({ message: "There is a conflicting booking at the same time" });
  }

  const updatedBooking = await RoomBooking.findByIdAndUpdate(
    id,
    {
      userID,
      roomID,
      reason,
      day,
      startTime,
      endTime,
    },
    { new: true }
  );

  if (!updatedBooking) throw new CustomError("Update fail");

  res.json(updatedBooking);
});

const deleteBooking = tryCatch(async (req, res) => {
  const { id } = req.params;
  const roombooking = await RoomBooking.findByIdAndDelete(id);

  if (!roombooking) {
    return res.status(404).json({ message: "room booking not found" });
  }

  res.json({ message: "room booking deleted" });
});

const getAllBookings = tryCatch(async (req, res) => {
  const bookings = await RoomBooking.find();
  res.json(bookings);
});

const getBookingByID = tryCatch(async (req, res) => {
  const { id } = req.params;
  const booking = await RoomBooking.findById(id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  res.json(booking);
});

export {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingByID,
  updateBooking,
};
