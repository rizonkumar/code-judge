const { StatusCodes } = require("http-status-codes");
const BaseError = require("./base.error");

/**
 * Represents a Not Found error (HTTP Status Code: 404).
 * This error occurs when the server cannot find the requested resource.
 * @extends BaseError
 */
class NotFoundError extends BaseError {
  /**
   * Constructs a new NotFoundError instance.
   * @param {string} methodName - The name of the method or resource that was not found.
   * @param {object} [data={}] - Additional data relevant to the error.
   */
  constructor(methodName, data = {}) {
    super(
      "Resource Not Found",
      StatusCodes.NOT_FOUND,
      `Method ${methodName}: The server cannot find the requested resource`,
      data
    );
  }
}

module.exports = NotFoundError;
