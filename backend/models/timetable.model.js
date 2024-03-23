import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    unique: true,
  },
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
});

export default mongoose.model("Timetable", timetableSchema);
