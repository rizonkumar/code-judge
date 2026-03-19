const BaseError = require("../errors/base.error");
const { StatusCodes } = require("http-status-codes");
const logger = require("../config/logger.config");

function errorHandler(err, req, res, next) {
  logger.error("Error caught in global error handler:", err);

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.details,
      data: null,
    });
  }

  // For unknown errors
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message =
    process.env.NODE_ENV === "development"
      ? "An unexpected error occurred"
      : err.message;

  return res.status(statusCode).json({
    success: false,
    message: message,
    error:
      process.env.NODE_ENV === "development"
        ? "Internal Server Error"
        : err.stack,
    data: null,
  });
}

module.exports = errorHandler;
