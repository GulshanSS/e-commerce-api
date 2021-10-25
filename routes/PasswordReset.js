const express = require("express");
const Pass = express.Router();

const { PasswordResetController } = require("../controllers");
const { validatePassword } = require("../middlewares/validation");

Pass.post("/", PasswordResetController.sendLink);
Pass.post("/:id/:token", validatePassword, PasswordResetController.resetPass);

module.exports = Pass;
