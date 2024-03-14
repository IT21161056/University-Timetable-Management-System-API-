const mongoose = require("mongoose");

const weeklyTimetableSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
  },
  monday: [{ type: mongoose.Schema.Types.ObjectId, ref: "TimeBlock" }],
  tuesday: [{ type: mongoose.Schema.Types.ObjectId, ref: "TimeBlock" }],
  wednesday: [{ type: mongoose.Schema.Types.ObjectId, ref: "TimeBlock" }],
  thursday: [{ type: mongoose.Schema.Types.ObjectId, ref: "TimeBlock" }],
  friday: [{ type: mongoose.Schema.Types.ObjectId, ref: "TimeBlock" }],
  saturday: [{ type: mongoose.Schema.Types.ObjectId, ref: "TimeBlock" }],
  sunday: [{ type: mongoose.Schema.Types.ObjectId, ref: "TimeBlock" }],
});

module.exports = mongoose.model("Timetable", weeklyTimetableSchema);
