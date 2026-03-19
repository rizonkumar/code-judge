import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import connectToDB from "./config/dbConfig";
import logger from "./config/loggerConfig";
import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";
import errorHandler from "./utils/errorHandler";
import startEvaluatorWorker from "./workers/evaluatorWorker";

const app = express();

// Middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// Routes
app.use("/api", apiRouter);

// Health check
app.get("/health", (_req, res) => {
  logger.info("Health check endpoint called");
  res
    .status(200)
    .json({ status: "healthy", message: "CodeJudge API is operational" });
});

// Error handling
app.use(errorHandler);

// Server startup
async function startServer() {
  try {
    await connectToDB();
    logger.info("Successfully connected to DB");

    startEvaluatorWorker();
    logger.info("Evaluator worker started");

    const server = app.listen(serverConfig.PORT, () => {
      logger.info(`Server started at PORT: ${serverConfig.PORT}`);
    });

    process.on("SIGTERM", () => {
      logger.info("SIGTERM signal received: closing HTTP server");
      server.close(() => {
        logger.info("HTTP server closed");
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error("Failed to start the server:", error);
    process.exit(1);
  }
}

startServer();
