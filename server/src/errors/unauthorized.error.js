const { StatusCodes } = require("http-status-codes");
const BaseError = require("./base.error");

/**
 * Represents an Unauthorized error (HTTP Status Code: 401).
 * This error occurs when the request requires authentication, but the client has not provided valid credentials.
 * @extends BaseError
 */
class UnauthorizedError extends BaseError {
  /**
   * Constructs a new UnauthorizedError instance.
   * @param {string} methodName - The name of the method or resource that requires authentication.
   * @param {object} [data={}] - Additional data relevant to the error.
   */
  constructor(methodName, data = {}) {
    super(
      "Unauthorized",
      StatusCodes.UNAUTHORIZED,
      `Method ${methodName}: The request requires authentication, but the client has not provided valid credentials.`,
      data
    );
  }
}

module.exports = UnauthorizedError;
