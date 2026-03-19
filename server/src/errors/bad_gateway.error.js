const { StatusCodes } = require("http-status-codes");
const BaseError = require("./base.error");

/**
 * Represents a Bad Gateway error (HTTP Status Code: 502).
 * This error occurs when the server receives an invalid response from an upstream server while trying to fulfill the request.
 * @extends BaseError
 */

class BadGatewayError extends BaseError {
  /**
   * Constructs a new BadGatewayError instance.
   * @param {string} message - The error message.
   * @param {object} [data={}] - Additional data relevant to the error.
   */
  constructor(message = "Bad Gateway", data = {}) {
    super(
      message,
      StatusCodes.BAD_GATEWAY,
      `The server received an invalid response from an upstream server while trying to fulfill the request`,
      data
    );
  }
}

module.exports = BadGatewayError;
