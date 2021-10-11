const express = require("express");
const User = express.Router();

const { UserController } = require("../controllers");

User.post("/register", UserController.userAdd);
User.post("/login", UserController.userLogin);

module.exports = User;
