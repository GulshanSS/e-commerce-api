const express = require("express");
const Auth = express.Router();

const { AuthController } = require("../controllers");
const { validateRegisterInput } = require("../middlewares/validation");

Auth.post("/register", validateRegisterInput, AuthController.Register);
Auth.post("/login", AuthController.Login);

module.exports = Auth;
