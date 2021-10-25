const express = require("express");
const Product = express.Router();

const { ProductController } = require("../../controllers");
const { validateProduct } = require("../../middlewares/validation");
const { grantAccess } = require("../../middlewares/auth");

Product.get(
  "/:id/details",
  grantAccess("readAny", "product"),
  ProductController.productGetOne
);

Product.get(
  "/getAll",
  grantAccess("readAny", "product"),
  ProductController.productGetAll
);

module.exports = Product;