const express = require("express");
const User = express.Router();

const { UserController } = require("../../controllers");
const { authorize } = require("../../middlewares/auth");

User.get("/getAllUser", authorize("admin"), UserController.userGetAll);

User.get("/:id/details", authorize("admin"), UserController.userGetOne);

User.delete("/:id/delete", authorize("admin"), UserController.userDelete);

User.post(
  "/:id/cancelDeleteApproval",
  authorize("admin"),
  UserController.cancelDeleteApproval
);

module.exports = User;
