const express = require("express");
const Product = express.Router();

const { ProductController } = require("../../controllers");
const { authorize } = require("../../middlewares/auth");

Product.get(
  "/products",
  authorize("vendor"),
  ProductController.productGetByVendor
);

Product.post(
  "/add",
  authorize("vendor"),
  ProductController.productAdd
);

Product.put(
  "/:id/update",
  authorize("vendor"),
  ProductController.productUpdate
);

Product.delete(
  "/:id/delete",
  authorize("vendor"),
  ProductController.productDelete
);

module.exports = Product;
