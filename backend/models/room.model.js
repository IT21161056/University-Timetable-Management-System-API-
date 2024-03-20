import mongoose from "mongoose";

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

export default mongoose.model("Room", roomSchema);
