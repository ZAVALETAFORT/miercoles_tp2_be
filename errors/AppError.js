class AppError extends Error {
  constructor(statusCode=400, code, message) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export default AppError;