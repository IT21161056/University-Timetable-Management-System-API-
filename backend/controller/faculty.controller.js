import { CustomError } from "../exceptions/baseException.js";
import Faculty from "../models/faculty.model.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";

//create faculty
export const addFaculty = tryCatch(async (req, res) => {
  const { facultyName } = req.body;
  if (!facultyName) throw new CustomError("Faculty name is required!", 500);

  const faculty = await Faculty.create({
    facultyName,
  });

  if (!faculty) {
    throw new CustomError("faculty creation failed.");
  }

  res.status(200).json(faculty);
});

//get all faculties
export const getAllFaculties = tryCatch(async (_, res) => {
  const faculties = await Faculty.find();

  if (!faculties)
    res.status(404).json({ message: "There are no any faculties!" });

  res.status(200).json(faculties);
});

//get faculty by id
export const getFacultyById = tryCatch(async (req, res) => {
  const facultyId = req.params.id;

  const faculty = await Faculty.findById(facultyId);

  if (!faculty) throw new CustomError();

  res.status(200).json(faculty);
});

export const removeFaculty = tryCatch(async (req, res) => {
  console.log("req.params.id >>", req.params.id);
  const result = await Faculty.findByIdAndDelete(req.params.id);

  if (!result) throw new CustomError("Faculty delete error!", 500);

  res.status(200).json({ message: "Faculty removed!" });
});
