class BaseError extends Error {
  name: string;
  statusCode: number;
  details: unknown;

  constructor(
    name: string,
    statusCode: number,
    description: string,
    details: unknown
  ) {
    super(description);
    this.name = name;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export default BaseError;
