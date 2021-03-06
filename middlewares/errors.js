module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
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

    if (err.name === "ValidationError") {
      let validationErrors = {};
      Object.values(err.errors).map(
        (x) => (validationErrors[x.path] = x.message)
      );
      res.status(error.statusCode).json({
        success: false,
        error: validationErrors,
      });
    }

    error.message = err.message;
    res.status(error.statusCode).json({
      success: false,
      error: error.message || "Internal server error",
      e: error,
    });
  }
};
