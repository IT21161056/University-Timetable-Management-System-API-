const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
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
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
});

module.exports = mongoose.model("Session", sessionSchema);
