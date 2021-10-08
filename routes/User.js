const express = require("express");
const User = express.Router();

const { UserController } = require("../controllers");

User.get("/");

module.exports = User;
