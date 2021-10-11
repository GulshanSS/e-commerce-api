const express = require("express");
const User = express.Router();

const { UserController } = require("../controllers");

User.post("/register", UserController.userRegister);
User.post("/login", UserController.userLogin);

module.exports = User;
