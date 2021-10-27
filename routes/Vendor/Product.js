const express = require("express");
const Product = express.Router();

const { ProductController } = require("../../controllers");
const { validateProduct } = require("../../middlewares/validation");
const { grantAccess } = require("../../middlewares/auth");

Product.post(
  "/add",
  validateProduct,
  grantAccess("updateOwn", "product"),
  ProductController.productAdd
);

Product.put(
  "/:id/update",
  grantAccess("updateOwn", "product"),
  validateProduct,
  ProductController.productUpdate
);

Product.delete(
  "/:id/delete",
  grantAccess("deleteOwn", "product"),
  ProductController.productDelete
);

module.exports = Product;
