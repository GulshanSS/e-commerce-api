const express = require("express");
const Product = express.Router();

const { ProductController } = require("../../controllers");

Product.get(
  "/:id/details",
  ProductController.productGetOne
);

Product.get(
  "/getAll",
  ProductController.productGetAll
);

module.exports = Product;