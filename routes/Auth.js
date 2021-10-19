const express = require("express");
const Auth = express.Router();

const { AuthController } = require("../controllers");

Auth.post("/register", AuthController.Register);
Auth.post("/login", AuthController.Login);

module.exports = Auth;
