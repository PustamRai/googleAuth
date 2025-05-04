import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`mongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log('mongoDB connection failed: ', error.message)
  }
};
