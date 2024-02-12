import mongoose from "mongoose";
import envConfig from "../Configs/envConfig";

const uri: string | undefined =
  envConfig.environment !== "production"
    ? "mongodb://127.0.0.1:27017/legal_drafter"
    : envConfig.db_uri;

const dbConnection = async () => {
  console.log("Initializing database connection...");
  try {
    if (!uri) {
      throw new Error("Database URI is not defined");
    }

    await mongoose.connect(uri as string);
    console.log("Database connection established successfully");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

export default dbConnection;
