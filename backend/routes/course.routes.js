const express = require("express");
const router = express.Router();
const {
  createNewCourse,
  getAllCourses,
  updateCourse,
  getCourseById,
  deleteCourse,
} = require("../controller/course.controller");

router.route("/").post(createNewCourse);
router.route("/").get(getAllCourses);
router.route("/").patch(updateCourse);
router.route("/:id").get(getCourseById);
router.route("/").delete(deleteCourse);

module.exports = router;
