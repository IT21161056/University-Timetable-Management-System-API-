import express from "express";
import { createCourse, getCourses } from "../controller/course.controller.js";

const router = express.Router();

router.route("/").post(createCourse);
router.route("/").get(getCourses);

export default router;
