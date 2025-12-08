// db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/blogapp";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      // options not required for mongoose v6+
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
