import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: parseInt(process.env.PORT || "3000", 10),
  NODE_ENV: process.env.NODE_ENV || "development",
  ATLAS_DB_URL: process.env.ATLAS_DB_URL || "",
  REDIS_PORT: parseInt(process.env.REDIS_PORT || "6379", 10),
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
};
