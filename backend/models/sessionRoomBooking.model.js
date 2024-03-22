import mongoose from "mongoose";

const roomBookingSchema = mongoose.Schema(
  {
    sessionID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "session",
    },
    roomID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
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
  },
  {
    timestamps: true,
  }
);

const RoomBooking = mongoose.model("SessionRoomBooking", roomBookingSchema);

export default RoomBooking;
