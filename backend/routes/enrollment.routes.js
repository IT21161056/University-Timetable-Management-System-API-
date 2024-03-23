import express from "express";
const router = express.Router();
import {
  getAllEnrollments,
  enrollUser,
  unenrollUser,
  getEnrollmentByID,
} from "../controller/enrollment.controller.js";

// Route to enroll a user in a course
router.post("/enroll", enrollUser);

// Route to unenroll a user from a course
router.post("/unenroll", unenrollUser);

//Route to get one enrollment
router.post("/getOne", getEnrollmentByID);

// Route to get all enrollments
router.get("/", getAllEnrollments);

export default router;
