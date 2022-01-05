module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode;
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: {
        statusCode: err.statusCode,
        message: err.message,
        stack: err.stack,
      },
    });
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
    });
  }
};
