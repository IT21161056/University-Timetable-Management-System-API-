import Timetable from "../models/timeTable.modal.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";

const createTimetable = tryCatch(async (req, res) => {
  console.log(new Date());

  const { facultyId } = req.body;
});

// const getTimetables = tryCatch(async (req, res) => {
//   const timeTables = await Timetable.find().populate({
//     path: "thursday",
//     match: {
//       startDateTime: {
//         $gte: new Date("2024-03-14"),
//       },
//     },
//   });

//   res.status(200).json(timeTables);
// });

const getTimetables = tryCatch(async (req, res) => {
  const timeTables = await Timetable.find().populate({
    path: [
      "thursday",
      "friday",
      "monday",
      "tuesday",
      "wednesday",
      "saturday",
      "sunday",
    ],
    match: {
      startDateTime: {
        $gte: new Date("2024-03-15T10:27:15.822Z"),
      },
    },
  });

  res.status(200).json(timeTables);
});

export { createTimetable, getTimetables };
