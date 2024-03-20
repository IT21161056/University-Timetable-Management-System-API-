const Course = require("../models/course.model");
const { tryCatch } = require("../utils/tryCatchWrapper");

const createCourse = tryCatch(async (req, res) => {
  console.log(req.body);
  const { courseId, courseName, faculty, description } = req.body;

  const course = await Course.create({
    courseId,
    courseName,
    faculty,
    description,
  });

  //   if (!course) new Error("course create error");

  res.status(200).json(course);
});

const getAllCourses = tryCatch(async (req, res) => {});
const updateCourse = tryCatch(async (req, res) => {});
const getCourseById = tryCatch(async (req, res) => {});
const deleteCourse = tryCatch(async (req, res) => {});

module.exports = {
  createCourse,
  getAllCourses,
  updateCourse,
  getCourseById,
  deleteCourse,
};
