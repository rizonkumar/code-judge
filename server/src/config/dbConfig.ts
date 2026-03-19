import mongoose from "mongoose";

import logger from "./loggerConfig";
import serverConfig from "./serverConfig";

async function connectToDB(): Promise<void> {
  try {
    logger.info("Attempting to connect to MongoDB...");
    if (serverConfig.NODE_ENV === "development") {
      await mongoose.connect(serverConfig.ATLAS_DB_URL, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
      });
      logger.info("Successfully connected to MongoDB");
    }
  } catch (error) {
    logger.error("Unable to connect to the DB server:", error);
    throw error;
  }
}

export default connectToDB;
