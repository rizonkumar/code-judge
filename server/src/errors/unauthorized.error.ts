import { StatusCodes } from "http-status-codes";

import BaseError from "./base.error";

class UnauthorizedError extends BaseError {
  constructor(methodName: string, data: unknown = {}) {
    super(
      "Unauthorized",
      StatusCodes.UNAUTHORIZED,
      `Method ${methodName}: The request requires authentication, but the client has not provided valid credentials.`,
      data
    );
  }
}

export default UnauthorizedError;
