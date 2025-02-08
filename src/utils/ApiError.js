class ApiError extends Error {
  constructor(
    statusCode,
    message = "We apologize for the inconvenience. The operation could not be completed. For assistance, please contact our support team at support@vivabackend.com",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }


  }
}

export {ApiError}