const express = require("express");
const router = express.Router();
const {
  addFaculty,
  getAllFaculties,
  getFacultyById,
} = require("../controller/faculty.controller");

router.route("/").post(addFaculty);
router.route("/").get(getAllFaculties);
router.route("/:id").get(getFacultyById);

module.exports = router;
