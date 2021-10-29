const { roles } = require("../../config/roles");

exports.grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

exports.verifiedEmail = (req, res, next) => {
  if (!req.user.active) {
    return res.status(401).json({ msg: "Please Verify your email first" });
  }
  next();
};
