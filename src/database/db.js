import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState === 1) {
      if (process.env.DEV_ENV === "develpment") {
        console.log("Database is already connected");
      }
      return true;
    }

    const mongoURI = process.env.MONGO_URI;

    await mongoose.connect(mongoURI);

    console.log("Database connected successfully");
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
}
