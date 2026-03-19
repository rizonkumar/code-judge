import { StatusCodes } from "http-status-codes";

import BaseError from "./base.error";

class NotFoundError extends BaseError {
  constructor(methodName: string, data: unknown = {}) {
    super(
      "Resource Not Found",
      StatusCodes.NOT_FOUND,
      `Method ${methodName}: The server cannot find the requested resource`,
      data
    );
  }
}

export default NotFoundError;
