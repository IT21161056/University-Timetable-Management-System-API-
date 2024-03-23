import mongoose from "mongoose";

const { Schema, model } = mongoose;

const enrollmentSchema = Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Enrollment", enrollmentSchema);
