import { DAYS } from "../constants/constants.js";
import { CustomError } from "../exceptions/baseException.js";
import NewTimetable from "../models/newTimetable.js";
import Session from "../models/session.model.js";
import User from "../models/userModel.js";
import SessionRoomBooking from "../models/sessionRoomBooking.model.js";

import { tryCatch } from "../utils/tryCatchWrapper.js";
import { getDayOfWeek } from "../utils/utilFunctions.js";

//create time table
const addSession = tryCatch(async (req, res) => {
  const { facultyId, startDateTime, endDateTime, location, courseId } =
    req.body;

  if (!facultyId || !startDateTime || !endDateTime || !location || !courseId)
    throw new CustomError("All fields are required!");

  //get existing time table to given faculty
  const existingTimetable = await NewTimetable.findOne({
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
    timetable = await NewTimetable.create({
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

// get all time tables
const getNewTimetables = tryCatch(async (req, res) => {
  const timetables = await NewTimetable.find().populate("sessions");
  res.json(timetables);
});

const getSessionsByDateTime = tryCatch(async (req, res) => {});

export { addSession, getNewTimetables, getSessionsByDateTime };
