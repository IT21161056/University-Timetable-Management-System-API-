import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
  },
  monday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
  tuesday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
  wednesday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
  thursday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
  friday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
  saturday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
  sunday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
});

export default mongoose.model("Timetable", timetableSchema);
