import mongoose from "mongoose";

const timetableSchema = mongoose.Schema({
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  week: {
    type: Number,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  facultyID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
});

export default mongoose.model("Timetable1", timetableSchema);
