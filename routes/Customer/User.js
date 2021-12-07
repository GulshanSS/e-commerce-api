const express = require("express");
const User = express.Router();

const {
  UserController,
  EmailVerificationController,
} = require("../../controllers");
const { grantAccess, verifiedEmail } = require("../../middlewares/auth");
const {
  productCheck,
  validateResetPassword,
} = require("../../middlewares/validation");

User.get(
  "/details",
  grantAccess("readOwn", "profile"),
  UserController.userDetails
);

User.get("/cart", grantAccess("readOwn", "product"), UserController.userCart);

User.get(
  "/myOrders",
  grantAccess("readOwn", "product"),
  UserController.userMyOrder
);

User.post(
  "/:id/addToCart",
  grantAccess("readAny", "product"),
  verifiedEmail,
  productCheck,
  UserController.userAddToCart
);

User.post(
  "/:id/buyNow",
  grantAccess("readAny", "product"),
  verifiedEmail,
  productCheck,
  UserController.userOrder
);

User.post(
  "/resetpassword",
  grantAccess("updateOwn", "profile"),
  verifiedEmail,
  validateResetPassword,
  UserController.resetPassword
);

User.post(
  "/:id/like",
  grantAccess("readAny", "product"),
  verifiedEmail,
  UserController.likeProduct
);

User.post(
  "/verify",
  grantAccess("readOwn", "profile"),
  EmailVerificationController.emailVerificationLink
);

module.exports = User;
