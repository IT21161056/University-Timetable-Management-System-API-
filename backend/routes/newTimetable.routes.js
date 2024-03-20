import express from "express";
const router = express.Router();
import {
  addSession,
  getNewTimetables,
  getSessionsByDateTime,
} from "../controller/newTimetable.controller.js";

router.route("/").post(addSession);
router.route("/").get(getNewTimetables);
router.route("/get-session").post(getSessionsByDateTime);

export default router;
