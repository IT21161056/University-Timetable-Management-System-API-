import Faculty from "../models/faculty.model.js";
import Session from "../models/session.model.js";
import Timetable from "../models/timeTable.modal.js";
import { CustomError } from "../exceptions/baseException.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";
import mongoose from "mongoose";

const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const saveSession = async (startDateTime, timeTable, session) => {
  switch (Days[new Date(startDateTime).getDay()]) {
    case "Monday":
      timeTable.monday.push(session);
      await timeTable.save();
      break;
    case "Tuesday":
      timeTable.tuesday.push(session);
      await timeTable.save();
      break;
    case "Wednesday":
      timeTable.wednesday.push(session);
      await timeTable.save();
      break;
    case "Thursday":
      timeTable.thursday.push(session);
      await timeTable.save();
      break;
    case "Friday":
      timeTable.friday.push(session);
      await timeTable.save();
      break;
    case "Saturday":
      timeTable.saturday.push(session);
      await timeTable.save();
      break;
    case "Sunday":
      timeTable.monday.push(session);
      await timeTable.save();
      break;
  }
  return;
};

const createSession = tryCatch(async (req, res) => {
  const { facultyId, startDateTime, endDateTime, location, courseId } =
    req.body;

  console.log(new Date(startDateTime).getDay());

  const faculty = await Faculty.findById(facultyId);

  console.log(faculty);

  if (!faculty) throw new CustomError();

  const facultyTimetable = await Timetable.findOne({
    faculty: faculty._id,
  }).populate(["monday"]);

  // const facultyTimetable1 = await Timetable.aggregate([
  //   {
  //     $match: { faculty: facultyId }, // Filter by faculty ID
  //   },
  //   {
  //     $project: {
  //       timetableId: "$_id",
  //       allSessions: {
  //         $concatArrays: [
  //           "$monday",
  //           "$tuesday",
  //           "$wednesday",
  //           "$thursday",
  //           "$friday",
  //           "$saturday",
  //           "$sunday",
  //         ],
  //       },
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "sessions",
  //       let: { allSessions: "$allSessions", timetableId: "$timetableId" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: {
  //               $and: [
  //                 { $in: ["$_id", "$$allSessions"] }, // Check if session ID is in allSessions array
  //                 { $lte: ["$startDateTime", endDateTime] }, // Check for overlap in start and end times
  //                 { $gte: ["$endDateTime", startDateTime] },
  //               ],
  //             },
  //           },
  //         },
  //       ],
  //       as: "sessions",
  //     },
  //   },
  // ]);

  const session = await Session.create({
    startDateTime,
    endDateTime,
    location,
    course: courseId,
  });

  if (facultyTimetable) {
    console.log("i have time table");
    saveSession(startDateTime, facultyTimetable, session._id);
  } else {
    const newTimeTable = await Timetable.create({ faculty: faculty.id });
    saveSession(startDateTime, newTimeTable, session._id);
  }

  console.log("returned");

  res.status(200).json({ message: "Session added!" });
});

const getSessionByGiveTimeRange = tryCatch(async (req, res) => {
  const { startDateTime, endDateTime } = req.body;
  const sessions = await Session.find({
    startDateTime: {
      $gte: new Date(startDateTime),
    },
    endDateTime: {
      $lt: new Date(endDateTime),
    },
  });

  res.status(200).json(sessions);
});

export { createSession, getSessionByGiveTimeRange };
