const express = require("express");
const User = express.Router();

const {
  UserController,
  EmailVerificationController,
} = require("../../controllers");
const { grantAccess } = require("../../middlewares/auth");
const {
  productCheck,
  validateResetPassword,
} = require("../../middlewares/validation");

User.get(
  "/:id/details",
  grantAccess("readOwn", "profile"),
  UserController.userGetOne
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
  validateResetPassword,
  UserController.resetPassword
);

User.post(
  "/:id/like",
  grantAccess("readAny", "product"),
  UserController.likeProduct
);

User.post(
  "/verify",
  grantAccess("readOwn", "profile"),
  EmailVerificationController.emailVerificationLink
);

module.exports = User;
