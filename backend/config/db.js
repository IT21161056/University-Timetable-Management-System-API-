import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("MongoDB is Connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
