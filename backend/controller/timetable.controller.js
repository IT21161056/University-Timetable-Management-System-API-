import { CustomError } from "../exceptions/baseException.js";
import Timetable from "../models/timetable.model.js";
import Faculty from "../models/faculty.model.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";

//create time table
const createTimetable = tryCatch(async (req, res) => {
  const { facultyId } = req.body;

  const existingTimetable = await Timetable.findOne({ faculty: facultyId });

  if (existingTimetable)
    throw new CustomError("Existing timetable found!", 400);

  const newTimetable = await Timetable.create({ faculty: facultyId });

  if (!newTimetable) throw new CustomError("Timetable create fail.", 500);

  res.status(200).json(newTimetable);
});

// get all time tables
const getTimetables = tryCatch(async (req, res) => {
  const timetables = await Timetable.find().populate("sessions");

  if (!timetables.length) throw new CustomError("Timetables not found!", 404);

  res.json(timetables);
});

const getTimetableByFaculty = tryCatch(async (req, res) => {
  const { facultyName } = req.body;

  const faculty = await Faculty.findOne({ facultyName });
});

export { createTimetable, getTimetables, getTimetableByFaculty };
