module.exports = {
  roleExtraction: async (req, res, next) => {
    if (req.headers["x-access-token"]) {
      const accessToken = req.headers["x-access-token"];
      const { userId, role } = await jwt.verify(
        accessToken,
        process.env.JWT_SECRET
      );
      // Check if token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res
          .status(401)
          .json({
            error: "JWT token has expired, please login to obtain a new one",
          });
      }
      res.user.role = role;
      next();
    } else {
      next();
    }
  },
};
