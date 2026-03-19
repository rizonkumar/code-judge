import { StatusCodes } from "http-status-codes";

import BaseError from "./base.error";

class NotImplementedError extends BaseError {
  constructor(methodName: string) {
    super(
      "NotImplemented",
      StatusCodes.NOT_IMPLEMENTED,
      `${methodName} Not Implemented`,
      {}
    );
  }
}

export default NotImplementedError;
