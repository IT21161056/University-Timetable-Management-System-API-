import express from "express";
const router = express.Router();
import {
  addSession,
  getTimetables,
  getSessionsByDateTime,
} from "../controller/newTimetable.controller.js";

router.route("/").post(addSession);
router.route("/").get(getTimetables);
router.route("/get-session").post(getSessionsByDateTime);

export default router;
