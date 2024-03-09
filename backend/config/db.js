const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI);
    console.log(`MongoDB Connected! ${conn.connection.host}`.bgYellow.black);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
