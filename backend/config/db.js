const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI);
    console.log(
      `MongoDB Connected! `.bgMagenta +
        ` host >>> ${conn.connection.host}`.magenta
    );
  } catch (error) {
    console.log(`${error}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;
