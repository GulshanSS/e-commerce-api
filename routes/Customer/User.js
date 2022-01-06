const express = require("express");
const User = express.Router();

const {
  UserController,
  EmailVerificationController,
} = require("../../controllers");
const { authorize, verifiedEmail } = require("../../middlewares/auth");
const {
  productCheck,
  validateResetPassword,
} = require("../../middlewares/validation");

User.get(
  "/details",
  authorize("user"),
  UserController.userDetails
);

User.get("/cart", authorize("user"), UserController.userCart);

User.get(
  "/myOrders",
  authorize("user"),
  UserController.userMyOrder
);

User.post(
  "/:id/addToCart",
  authorize("user"),
  verifiedEmail,
  productCheck,
  UserController.userAddToCart
);

User.post(
  "/:id/buyNow",
  authorize("user"),
  verifiedEmail,
  productCheck,
  UserController.userOrder
);

User.post(
  "/resetpassword",
  authorize("user"),
  verifiedEmail,
  validateResetPassword,
  UserController.resetPassword
);

User.post(
  "/:id/like",
  authorize("user"),
  verifiedEmail,
  UserController.likeProduct
);

User.post(
  "/verify",
  authorize("user"),
  EmailVerificationController.sendEmailVerificationLink
);

module.exports = User;
