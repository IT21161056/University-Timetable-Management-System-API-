import express from "express";
import {
  addFaculty,
  getAllFaculties,
  getFacultyById,
  removeFaculty,
} from "../controller/faculty.controller.js";

const router = express.Router();

router.route("/").post(addFaculty);
router.route("/").get(getAllFaculties);
router.route("/:id").get(getFacultyById);
router.route("/:id").delete(removeFaculty);

export default router;
