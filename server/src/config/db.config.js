const mongoose = require("mongoose");
const { ATLAS_DB_URL, NODE_ENV } = require("./server.config");
const logger = require("./logger.config");

async function connectToDB() {
  try {
    logger.info("Attempting to connect to MongoDB...");
    if (NODE_ENV === "development") {
      await mongoose.connect(ATLAS_DB_URL, {
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

module.exports = connectToDB;
