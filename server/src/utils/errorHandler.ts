import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import logger from "../config/loggerConfig";
import { BaseError } from "../errors";

function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error("Error caught in global error handler:", err);

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.details,
      data: null,
    });
  }

  const statusCode =
    (err as BaseError).statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message =
    process.env.NODE_ENV === "production"
      ? "An unexpected error occurred"
      : err.message;

  return res.status(statusCode).json({
    success: false,
    message: message,
    error:
      process.env.NODE_ENV === "production" ? "Internal Server Error" : err.stack,
    data: null,
  });
}

export default errorHandler;
