import mongoose from "mongoose";

const enrollmentSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
