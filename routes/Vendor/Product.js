const express = require("express");
const Product = express.Router();

const { ProductController } = require("../../controllers");
const { validateProduct } = require("../../middlewares/validation");
const { authorize } = require("../../middlewares/auth");

Product.get(
  "/products",
  authorize("vendor"),
  ProductController.productGetByVendor
);

Product.post(
  "/add",
  validateProduct,
  authorize("vendor"),
  ProductController.productAdd
);

Product.put(
  "/:id/update",
  authorize("vendor"),
  validateProduct,
  ProductController.productUpdate
);

Product.delete(
  "/:id/delete",
  authorize("vendor"),
  ProductController.productDelete
);

module.exports = Product;
