const express = require("express");
const Pass = express.Router();

const { PasswordResetController } = require("../controllers");

Pass.post("/", PasswordResetController.sendLink);
Pass.post("/:id/:token", PasswordResetController.resetPass);

module.exports = Pass;
