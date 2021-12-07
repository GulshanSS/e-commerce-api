const express = require("express");
const Auth = express.Router();

const {
  AuthController,
  ForgotPasswordController,
  EmailVerificationController,
} = require("../../controllers");

const {
  validateRegisterInput,
  validateLoginInput,
  validatePassword,
} = require("../../middlewares/validation");

Auth.post("/register", validateRegisterInput, AuthController.Register);
Auth.post("/login", validateLoginInput, AuthController.Login);
Auth.post("/forgot-password", ForgotPasswordController.sendLink);
Auth.post(
  "/forgot-password/:id/:token",
  validatePassword,
  ForgotPasswordController.forgotPass
);
Auth.get("/verify/:id/:token", EmailVerificationController.verifyEmail);
module.exports = Auth;
