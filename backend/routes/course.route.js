const express = require("express");
const router = express.Router();
const { createCourse } = require("../controller/course.controller");

router.route("/").post(createCourse);

module.exports = router;
