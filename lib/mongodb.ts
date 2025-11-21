import mongoose, { Mongoose } from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    // In case themes and categories were deleted, re-run seeds
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "yi-flow",
      })
      .then(async (result) => {
        console.log("Connected to MongoDB");
        return result;
      })
      .catch((error) => {
        console.error("[mongoose] connection error:", {
          message: error?.message,
          code: error?.code,
          name: error?.name,
          stack: error?.stack,
        });
        // Re-throw the original error so Next can show it in the console
        throw error;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
