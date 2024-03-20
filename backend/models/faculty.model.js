const mongoose = require("mongoose");

const facultySchema = mongoose.Schema({
  facultyName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Faculty", facultySchema);
