import express from "express";
const router = express.Router();
import {
  createTimetable,
  getTimetables,
  getTimetableByFaculty,
} from "../controller/timetable.controller.js";

router.route("/").post(createTimetable);
router.route("/").get(getTimetables);
router.route("/get-session").post(getTimetableByFaculty);

export default router;
