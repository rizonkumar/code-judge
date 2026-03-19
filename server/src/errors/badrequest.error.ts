import { StatusCodes } from "http-status-codes";

import BaseError from "./base.error";

class BadRequestError extends BaseError {
  constructor(propertyName: string, details: unknown = {}) {
    super(
      "BadRequest",
      StatusCodes.BAD_REQUEST,
      `Invalid structure for ${propertyName} provided`,
      details
    );
  }
}

export default BadRequestError;
