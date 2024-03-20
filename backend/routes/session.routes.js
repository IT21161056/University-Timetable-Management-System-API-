import express from "express";
import {
  createSession,
  getSessionByGiveTimeRange,
} from "../controller/session.controller.js";

const router = express.Router();

router.route("/").post(createSession);
router.route("/get-session").post(getSessionByGiveTimeRange);

export default router;
