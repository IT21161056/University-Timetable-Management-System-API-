const Timetable = require("../models/weeklyTimeTable.model");
const Course = require("../models/course.model");
const Notification = require("../models/notification.model");
const Enrollment = require("../models/enrollmentModel");
const { tryCatch } = require("../utils/tryCatchWrapper");
const ObjectId = require("mongoose").Types.ObjectId;
const { CustomError } = require("../exceptions/baseException");

//@DESC add new session
const createSession = tryCatch(async (req, res) => {
  const { courseID, week, day, startTime, endTime, facultyID, location } =
    req.body;

  if (
    !ObjectId.isValid(courseID) ||
    !ObjectId.isValid(facultyID) ||
    !ObjectId.isValid(location)
  ) {
    throw new CustomError("Invalid ObjectId");
  }
  // console.log(req.body);

  // const oldSessions = await Timetable.find({
  //   startTime: { $gte: new Date(startTime) },
  //   endTime: { lt: new Date(endTime) },
  // });

  const session = await Timetable.create({
    courseID,
    week,
    day,
    startTime,
    endTime,
    facultyID,
    location,
  });

  const course = await Course.findById(session.courseID);

  const enrolledUsers = await Enrollment.find({ courseID: session.courseID });

  const notifications = enrolledUsers.map(
    (user) =>
      new Notification({
        userID: user.userID,
        message: `A session for course ${course.courseName} has been added!`,
      })
  );

  await Notification.insertMany(notifications);

  res.status(200).json(session);
});

//@DESC get all sessions
const getSessions = tryCatch(async (re, res) => {
  const sessions = await Timetable.find().populate(["facultyID", "location"]);
  res.status(200).json(sessions);
});

//@DESC update session
const updateSession = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { courseID, week, day, startTime, endTime, facultyID, location } =
    req.body;

  const session = await Timetable.findByIdAndUpdate(
    id,
    {
      courseID,
      week,
      day,
      startTime,
      endTime,
      facultyID,
      location,
    },
    { new: true }
  );

  const course = await Course.findById(session.courseID);

  const enrolledUsers = await Enrollment.find({ courseID: session.courseID });

  const notifications = enrolledUsers.map(
    (user) =>
      new Notification({
        userID: user.userID,
        message: `A session for course ${course.courseName} has been updated!`,
      })
  );

  await Notification.insertMany(notifications);

  res.status(200).json(session);
});

//@DESC delete session
const removeSession = tryCatch(async (re, res) => {
  const { id } = req.params;

  const session = await Timetable.findByIdAndDelete(id);

  if (!session) res.status(400).json({ message: "session not found!" });

  const course = await Course.findById(session.courseID);

  const enrolledUsers = await Enrollment.find({ courseID: session.courseID });

  const notifications = enrolledUsers.map(
    (user) =>
      new Notification({
        userID: user.userID,
        message: `A session for course ${course.courseName} has been deleted!`,
      })
  );

  await Notification.insertMany(notifications);

  res.status(200).json({ message: "session deleted!" });
});

const getSessionsInGivenPeriod = tryCatch(async (req, res) => {
  const { startTime, endTime } = req.body;

  const oldSessions = await Timetable.find({
    startTime: {
      $gte: new Date(startTime),
    },
    endTime: {
      $lt: new Date(endTime),
    },
  });

  res.status(200).json(oldSessions);
});

module.exports = {
  createSession,
  getSessions,
  updateSession,
  removeSession,
  getSessionsInGivenPeriod,
};
