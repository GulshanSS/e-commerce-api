const express = require("express");
const User = express.Router();

const { UserController } = require("../controllers");
const { grantAccess } = require("../middlewares/auth");
const { productCheck } = require("../middlewares/validation");

User.get(
  "/getAllUser",
  grantAccess("readAny", "profile"),
  UserController.userGetAll
);
User.get(
  "/:id/details",
  grantAccess("readOwn", "profile"),
  UserController.userGetOne
);
User.delete(
  "/:id/delete",
  grantAccess("deleteAny", "profile"),
  UserController.userDelete
);
User.get("/cart", grantAccess("readOwn", "product"), UserController.userCart);
User.post(
  "/:id/addToCart",
  grantAccess("readAny", "product"),
  productCheck,
  UserController.userAddToCart
);
User.post(
  "/:id/buyNow",
  grantAccess("readAny", "product"),
  productCheck,
  UserController.userOrder
);
User.post(
  "/resetpassword",
  grantAccess("readOwn", "profile"),
  UserController.resetPassword
)
module.exports = User;
