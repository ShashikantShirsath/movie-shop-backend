import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://shashikantshirsath08_db_user:Shashi%123@cluster0.0ddsapu.mongodb.net/?appName=Cluster0");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection error:", err.message);
    process.exit(1);
  }
};
