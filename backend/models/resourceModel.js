import mongoose from "mongoose";

const resourceSchema = mongoose.Schema({
  resourceName: {
    type: String,
    required: true,
  },
  description: String,
});

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
