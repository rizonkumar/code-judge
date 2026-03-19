import { StatusCodes } from "http-status-codes";

import BaseError from "./base.error";

class InternalServerError extends BaseError {
  constructor(details: unknown = {}) {
    super(
      "InternalServerError",
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong",
      details
    );
  }
}

export default InternalServerError;
