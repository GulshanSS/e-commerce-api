const express = require("express");
const User = express.Router();

const {
  UserController,
  EmailVerificationController,
} = require("../../controllers");
const { grantAccess, verifiedEmail } = require("../../middlewares/auth");
const { validateResetPassword } = require("../../middlewares/validation");

User.get(
  "/details",
  grantAccess("readOwn", "profile"),
  UserController.userDetails
);

User.post(
  "/resetpassword",
  grantAccess("readOwn", "profile"),
  verifiedEmail,
  validateResetPassword,
  UserController.resetPassword
);

User.post(
  "/deleteApproval",
  grantAccess("readOwn", "profile"),
  UserController.deleteApproval
);

User.post(
  "/verify",
  grantAccess("readOwn", "profile"),
  EmailVerificationController.emailVerificationLink
);

module.exports = User;
