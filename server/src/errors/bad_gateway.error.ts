import { StatusCodes } from "http-status-codes";

import BaseError from "./base.error";

class BadGatewayError extends BaseError {
  constructor(message: string = "Bad Gateway", data: unknown = {}) {
    super(
      message,
      StatusCodes.BAD_GATEWAY,
      "The server received an invalid response from an upstream server while trying to fulfill the request",
      data
    );
  }
}

export default BadGatewayError;
