import express from "express";
import {
  addFaculty,
  getAllFaculties,
  getFacultyById,
} from "../controller/faculty.controller.js";

const router = express.Router();

router.route("/").post(addFaculty);
router.route("/").get(getAllFaculties);
router.route("/:id").get(getFacultyById);

export default router;
