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

module.exports = {
  createCourse,
};
