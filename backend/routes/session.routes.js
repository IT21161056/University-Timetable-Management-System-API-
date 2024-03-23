import express from "express";
const router = express.Router();
import {
  addSession,
  changeLocation,
  getAllSessions,
  deleteSession,
} from "../controller/session.controller.js";

router.route("/").post(addSession);
router.route("/").get(getAllSessions);
router.route("/").delete(deleteSession);

export default router;
