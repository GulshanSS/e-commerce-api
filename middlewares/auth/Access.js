const ErrorHandler = require("../../utils/errorHandler");

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(new ErrorHandler(401, "Unuthorized Access"));
    }
    next();
  };
};

exports.verifiedEmail = (req, res, next) => {
  if (!req.user.active) {
    next(new ErrorHandler(401, "Please Verify your email first"));
  }
  next();
};
