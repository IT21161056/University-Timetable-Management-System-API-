import { CustomError } from "../exceptions/baseException.js";
import Session from "../models/session.model.js";
import Timetable from "../models/newTimetable.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";
import { getDayOfWeek } from "../utils/utilFunctions.js";

const getAllSessions = tryCatch(async (req, res) => {
  const sessions = await Session.find();

  if (!sessions.length) throw new CustomError("No sessions found!", 404);

  res.status(200).json(sessions);
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

export { getAllSessions, deleteSession };
