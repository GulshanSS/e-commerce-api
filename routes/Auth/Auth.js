const express = require("express");
const Auth = express.Router();

const {
  AuthController,
  PasswordResetController,
  EmailVerificationController,
} = require("../../controllers");

const {
  validateRegisterInput,
  validateLoginInput,
  validatePassword,
} = require("../../middlewares/validation");

Auth.post("/register", validateRegisterInput, AuthController.Register);
Auth.post("/login", validateLoginInput, AuthController.Login);
Auth.post("/password-reset", PasswordResetController.sendLink);
Auth.post(
  "/password-reset/:id/:token",
  validatePassword,
  PasswordResetController.resetPass
);
Auth.post("/verify/:id/:token", EmailVerificationController.verifyEmail);
module.exports = Auth;
