class AppBaseError extends Error {
  constructor(message, status, type) {
    super(message);
    this.status = status;
    this.type = type;
  }
}

class UnauthorizedError extends AppBaseError {
  constructor(
    message = "Unauthorized",
    status = 401,
    type = "Error.Unauthorized"
  ) {
    super(message, status, type);
  }
}

class BadRequestError extends AppBaseError {
  constructor(
    message = "Bad Request",
    status = 400,
    type = "Error.BadRequest"
  ) {
    super(message, status, type);
  }
}

module.exports = { UnauthorizedError, BadRequestError, AppBaseError };
