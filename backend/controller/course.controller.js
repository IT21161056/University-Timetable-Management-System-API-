import Course from "../models/course.model.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";
import { CustomError } from "../exceptions/baseException.js";

//add new course to the system
const createCourse = tryCatch(async (req, res) => {
  console.log("course");
  const { courseId, courseName, faculty, description } = req.body;

  const course = await Course.create({
    courseId,
    courseName,
    faculty,
    description,
  });

  if (!course) throw new CustomError("Course create fail.");

  res.status(200).json(course);
});

//get all the available course
const getCourses = tryCatch(async (_, res) => {
  const courses = await Course.find();

  res.status(200).json(courses);
});

export { createCourse, getCourses };
