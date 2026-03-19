const BaseError = require("./base.error");
const { StatusCodes } = require("http-status-codes");

class NotImplemented extends BaseError {
  constructor(methodName) {
    super(
      "NotImplemented",
      StatusCodes.INTERNAL_SERVER_ERROR,
      `${methodName} Not Implemented`,
      {}
    );
  }
}

module.exports = NotImplemented;
