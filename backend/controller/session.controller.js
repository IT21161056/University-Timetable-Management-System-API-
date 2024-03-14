const Faculty = require("../models/faculty.model");
const Session = require("../models/session.model");
const Timetable = require("../models/timeTable.modal");
const { NotFound } = require("../exceptions/baseException");
const { tryCatch } = require("../utils/tryCatchWrapper");

const Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const createSession = tryCatch(async (req, res) => {
  const { facultyId, startDateTime, endDateTime, location, courseId } =
    req.body;

  console.log(Days[new Date().getDay()]);

  const faculty = await Faculty.findById(facultyId);

  if (!faculty) throw new NotFound();

  const timeTable = Timetable.create({ faculty: facultyId });

  if (!timeTable) throw new Error("Time table create failed");

  const session = await Session.create({
    facultyName,
  });
});

module.exports = {
  createSession,
};
