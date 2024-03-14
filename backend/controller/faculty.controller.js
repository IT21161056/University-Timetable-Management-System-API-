const { NotFound } = require("../exceptions/baseException");
const Faculty = require("../models/faculty.model");

const { tryCatch } = require("../utils/tryCatchWrapper");

const addFaculty = async (req, res) => {
  try {
    const { facultyName } = req.body;

    const faculty = await Faculty.create({
      facultyName,
    });

    if (!faculty) {
      throw new Error("Faculty creation failed!");
    }

    res.status(200).json(faculty);
  } catch (error) {
    req.status(500).json(error.message);
  }
};

const getAllFaculties = async (_, res) => {
  try {
    const faculties = await Faculty.find();

    if (!faculties)
      res.status(200).json({ message: "There are no any faculties!" });

    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getFacultyById = tryCatch(async (req, res) => {
  const facultyId = req.params.id;

  const faculty = await Faculty.findById(facultyId);

  if (!faculty) throw new NotFound();

  res.status(200).json(faculty);
});

const removeFaculty = tryCatch(async (req, res) => {
  const result = await Faculty.findByIdAndDelete(req.params.id);

  if (!result) new NotFound();

  res.status(200).json({ message: "Faculty removed!" });
});

module.exports = {
  addFaculty,
  getAllFaculties,
  getFacultyById,
  removeFaculty,
};
