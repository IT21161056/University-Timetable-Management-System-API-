const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  building: {
    type: String,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Room", roomSchema);
