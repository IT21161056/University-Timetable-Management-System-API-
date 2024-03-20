import express from "express";
import { getAllNotifications } from "../controller/notification.controller.js";

const router = express.Router();

router.route("/").get(getAllNotifications);

export default router;
