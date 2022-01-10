const { User } = require("../../models");
const bcrypt = require("bcrypt");
const isEmpty = require("is-empty");
const asyncHandler = require("../asyncHandler");

exports.createAdmin = asyncHandler(async (req, res, next) => {
  const admin = await User.find({ role: "admin" });
  if (isEmpty(admin)) {
    const user = new User({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASS,
      role: "admin",
    });
    await user.save();
  }
  next();
});
