const express = require("express");
const Auth = express.Router();

const { AuthController } = require("../controllers");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../middlewares/validation");
const { createAdmin } = require("../middlewares/auth");

Auth.post("/register", validateRegisterInput, AuthController.Register);
Auth.post(
  "/login",
  validateLoginInput,
  AuthController.Login
);

module.exports = Auth;
