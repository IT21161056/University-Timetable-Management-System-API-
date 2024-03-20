import mongoose from "mongoose";

const facultySchema = mongoose.Schema({
  facultyName: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Faculty", facultySchema);
