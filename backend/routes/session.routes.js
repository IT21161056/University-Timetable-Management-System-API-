import express from "express";
const router = express.Router();
import {
  getAllSessions,
  deleteSession,
} from "../controller/session.controller.js";

router.route("/").get(getAllSessions);
router.route("/").delete(deleteSession);

export default router;
