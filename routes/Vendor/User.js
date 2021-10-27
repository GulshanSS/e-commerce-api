const express = require("express");
const User = express.Router();

const {
  UserController,
  EmailVerificationController,
} = require("../../controllers");
const { grantAccess } = require("../../middlewares/auth");
const {
  validateResetPassword,
} = require("../../middlewares/validation");

User.get(
  "/:id/details",
  grantAccess("readOwn", "profile"),
  UserController.userGetOne
);

User.get("/cart", grantAccess("readOwn", "product"), UserController.userCart);

User.post(
  "/resetpassword",
  grantAccess("readOwn", "profile"),
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
