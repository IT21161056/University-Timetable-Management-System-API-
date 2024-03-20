import Enrollment from "../models/enrollmentModel.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";

// Controller for enrolling a user in a course
const enrollUser = tryCatch(async (req, res) => {
  const { userID, courseID } = req.body;
  const newEnrollment = new Enrollment({
    userID,
    courseID,
  });
  const savedEnrollment = await newEnrollment.save();
  res.status(201).json(savedEnrollment);
});

// Controller for unenrolling a user from a course
const unenrollUser = tryCatch(async (req, res) => {
  const { userID, courseunenrollUserID } = req.body;
  const enrollment = await Enrollment.findOneAndDelete({ userID, courseID });

  if (!enrollment) {
    return res.status(404).json({ message: "Enrollment not found" });
  }

  res.json({ message: "User unenrolled from the course" });

  res.status(500).json({ error: error.message });
});

// Controller for getting all enrollments
const getAllEnrollments = tryCatch(async (req, res) => {
  const enrollments = await Enrollment.find();
  res.json(enrollments);
});

export { enrollUser, unenrollUser, getAllEnrollments };
