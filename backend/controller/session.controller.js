import { CustomError } from "../exceptions/baseException.js";
import Session from "../models/session.model.js";
import SessionRoomBooking from "../models/sessionRoomBooking.model.js";
import Room from "../models/room.model.js";
import Timetable from "../models/timetable.model.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";
import { getDayOfWeek } from "../utils/utilFunctions.js";

const addSession = tryCatch(async (req, res) => {
  const { facultyId, startDateTime, endDateTime, location, courseId } =
    req.body;

  if (!facultyId || !startDateTime || !endDateTime || !location || !courseId)
    throw new CustomError("All fields are required!");

  //get existing time table to given faculty
  const existingTimetable = await Timetable.findOne({
    faculty: facultyId,
  }).populate("sessions");

  //check if there are any sessions in given time
  if (existingTimetable) {
    const sessionsInDay = existingTimetable.sessions.filter(
      (session) => session.day === getDayOfWeek(startDateTime)
    );

    sessionsInDay.map((session) => {
      const existingStartDateTime = new Date(session.startDateTime).getTime();
      const existingEndDateTime = new Date(session.endDateTime).getTime();
      const userEnteredStartDateTime = new Date(startDateTime).getTime();
      const userEnteredEndDateTime = new Date(endDateTime).getTime();

      //check overlapping status
      const overlapped =
        (existingStartDateTime <= userEnteredStartDateTime &&
          existingEndDateTime > userEnteredStartDateTime) ||
        (existingStartDateTime <= userEnteredEndDateTime &&
          existingEndDateTime > userEnteredEndDateTime);

      if (overlapped) {
        throw new CustomError("This time block is not available!", 400);
      }
    });
  }

  let timetable = null;

  if (existingTimetable) {
    timetable = existingTimetable;
  } else {
    timetable = await Timetable.create({
      faculty: facultyId,
    });
  }

  if (!timetable) throw new CustomError("No timetable to add sessions!", 500);

  const session = await Session.create({
    startDateTime,
    endDateTime,
    location,
    course: courseId,
    day: getDayOfWeek(startDateTime),
  });

  timetable.sessions.push(session._id);

  await timetable.save();

  await SessionRoomBooking.create({
    sessionID: session._id,
    roomID: location,
    day: getDayOfWeek(startDateTime),
    startTime: startDateTime,
    endTime: endDateTime,
  });

  // const users = await User.find({});

  // const notifications = users.map((user) => {
  //   return new Notification({
  //     userID: user._id,
  //     message: `Room "${room.roomName}" in building ${room.building} has been deleted`,
  //   });
  // });

  // await Notification.insertMany(notifications);

  res.json({ message: "session added successfully" });
});

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

export { addSession, getAllSessions, deleteSession, changeLocation };
