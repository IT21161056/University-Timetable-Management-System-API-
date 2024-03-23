import mongoose from "mongoose";

const facultySchema = mongoose.Schema({
  facultyName: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("Faculty", facultySchema);
