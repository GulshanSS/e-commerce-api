const express = require("express");
const User = express.Router();

const {
  UserController,
  EmailVerificationController,
} = require("../../controllers");
const { authorize, verifiedEmail } = require("../../middlewares/auth");
const { validateResetPassword } = require("../../middlewares/validation");

User.get(
  "/details",
  authorize("vendor"),
  UserController.userDetails
);

User.post(
  "/resetpassword",
  authorize("vendor"),
  verifiedEmail,
  validateResetPassword,
  UserController.resetPassword
);

User.post(
  "/deleteApproval",
  authorize("vendor"),
  UserController.deleteApproval
);

User.post(
  "/verify",
  authorize("vendor"),
  EmailVerificationController.sendEmailVerificationLink
);

module.exports = User;
