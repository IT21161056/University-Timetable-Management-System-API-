import Enrollment from "../models/enrollment.model.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";

import { CustomError } from "../exceptions/baseException.js";

// Controller for enrolling a user in a course
const enrollUser = tryCatch(async (req, res) => {
  const { userID, courseID } = req.body;

  if (!userID || !courseID)
    throw new CustomError("All fields are required!", 500);

  const isAlreadyEnrolled = await Enrollment.findOne({ userID, courseID });

  if (isAlreadyEnrolled) throw new CustomError("Already enrolled!", 403);

  const newEnrollment = await Enrollment.create({
    userID,
    courseID,
  });

  if (!newEnrollment) throw new CustomError("Enrollment failed", 500);

  res.status(201).json(newEnrollment);
});

// Controller for unenrolling a user from a course
const unenrollUser = tryCatch(async (req, res) => {
  const { userID, courseID } = req.body;
  const enrollment = await Enrollment.findOneAndDelete({ userID, courseID });

  if (!enrollment) throw new CustomError("Enrollment not found", 404);

  res.status(200).json({ message: "User unenrolled from the course" });
});

// Controller for getting all enrollments
const getAllEnrollments = tryCatch(async (req, res) => {
  const enrollments = await Enrollment.find();

  if (!enrollments.length) throw new CustomError("No any enrollments", 404);

  res.json(enrollments);
});

const getEnrollmentByID = tryCatch(async (req, res) => {
  const { userID, courseID } = req.body;

  console.log("hello");

  if (!userID || !courseID)
    throw new CustomError("All fields are required!", 500);

  const enrollment = await Enrollment.findOne({ userID, courseID });

  if (!enrollment) throw new CustomError("Enrollment not found!", 404);

  res.json(enrollment);
});

export { enrollUser, unenrollUser, getAllEnrollments, getEnrollmentByID };
