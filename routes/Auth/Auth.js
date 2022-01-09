const express = require("express");
const Auth = express.Router();

const {
  EmailVerificationController,
  AuthController,
  ForgotPasswordController,
} = require("../../controllers");

Auth.post("/register", AuthController.Register);
Auth.post("/login", AuthController.Login);
Auth.post("/forgot-password", ForgotPasswordController.sendLink);
Auth.post("/forgot-password/:id/:token", ForgotPasswordController.forgotPass);
Auth.get("/verify/:id/:token", EmailVerificationController.verifyEmail);

module.exports = Auth;
