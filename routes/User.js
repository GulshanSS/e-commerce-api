const express = require("express");
const User = express.Router();
const { UserController } = require("../controllers");

const { grantAccess } = require("../middlewares/auth");

User.get("/getAllUser", grantAccess("readAny", "profile"),UserController.userGetAll);
User.get("/:id/details", grantAccess("readOwn", "profile"), UserController.userGetOne);
User.delete("/:id/delete", grantAccess("deleteAny", "profile"), UserController.userDelete);

module.exports = User;
