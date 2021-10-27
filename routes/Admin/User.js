const express = require("express");
const User = express.Router();

const { UserController } = require("../../controllers");
const { grantAccess } = require("../../middlewares/auth");

User.get(
  "/getAllUser",
  grantAccess("readAny", "profile"),
  UserController.userGetAll
);

User.get(
  "/:id/details",
  grantAccess("readAny", "profile"),
  UserController.userGetOne
);

User.delete(
  "/:id/delete",
  grantAccess("deleteAny", "profile"),
  UserController.userDelete
);

User.post(
  "/:id/cancelDeleteApproval",
  grantAccess("deleteAny", "profile"),
  UserController.cancelDeleteApproval
);

module.exports = User;
