import express from "express";
import {
  createTimetable,
  getTimetables,
} from "../controller/timetable.controller.js";

const router = express.Router();

router.route("/").post(createTimetable);
router.route("/").get(getTimetables);

export default router;
