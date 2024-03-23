import { CustomError } from "../exceptions/baseException.js";
import Session from "../models/session.model.js";
import SessionRoomBooking from "../models/sessionRoomBooking.model.js";
import Room from "../models/room.model.js";
import Timetable from "../models/timetable.model.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";

const getAllSessions = tryCatch(async (req, res) => {
  const sessions = await Session.find();

  if (!sessions.length) throw new CustomError("No sessions found!", 404);

  res.status(200).json(sessions);
});

const changeLocation = tryCatch(async (req, res) => {
  const { newLocation, sessionID } = req.body;

  const session = Session.findById(sessionID);

  if (!session) throw new CustomError("Session not found", 404);

  // Check if room is available in timetable
  const locationConflict = await SessionRoomBooking.findOne({
    sessionID,
    $or: [
      {
        $and: [
          { startTime: { $lte: session.startDateTime } },
          { endTime: { $gte: session.startDateTime } },
        ],
      },
      {
        $and: [
          { startTime: { $lte: session.endDateTime } },
          { endTime: { $gte: session.endDateTime } },
        ],
      },
    ],
  });

  if (locationConflict) {
    throw new CustomError(
      "Room is already allocated in the timetable during the specified time"
    );
  }

  const newRoom = await Room.findOne({ roomName: newLocation });

  if (!newRoom) throw new CustomError("Room not found.", 404);

  session.location = newRoom._id;

  await session.save();

  res.status(200).json({
    message: `Session location has been changed.The new location is ${newRoom.roomName}`,
  });
});

//delete a session
const deleteSession = tryCatch(async (req, res) => {
  const { faculty, sessionID } = req.body;

  // Find the session to delete
  const session = await Session.findById(sessionID);

  if (!session) throw new CustomError("Session not found", 404);

  // Find the timetable associated with the faculty
  const timetable = await Timetable.findOne({ faculty: faculty }).populate(
    "sessions"
  );

  // Filter out the session to be deleted from the timetable
  if (!timetable) throw new CustomError("Timetable not found", 404);

  timetable.sessions = timetable.sessions.filter(
    (data) => !data._id.equals(session._id)
  );

  await timetable.save();

  const deletedSession = await Session.findByIdAndDelete(session._id);

  res
    .status(200)
    .json({ message: "Session deleted successfully", deletedSession });
});

export { getAllSessions, deleteSession, changeLocation };
