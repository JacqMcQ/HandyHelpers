import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://jacqlynmcquade:aqrYQxL6tCXvOJmi@handy-helpers.pql0f.mongodb.net/handy-helpers?retryWrites=true&w=majority"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connect; 
