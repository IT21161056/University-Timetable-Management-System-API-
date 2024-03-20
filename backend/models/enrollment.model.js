import mongoose from "mongoose";

const { Schema, model } = mongoose;

const enrollmentSchema = Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Enrollment", enrollmentSchema);
