const mongoose = require("mongoose");

const timeBlockSchema = new mongoose.Schema({
  startDateTime: {
    type: String,
    required: true,
  },
  endDateTime: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  location: String,
  available: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Number,
  },
});

module.exports = mongoose.Model("TimeBlock", timeBlockSchema);
