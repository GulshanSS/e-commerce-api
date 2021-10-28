const express = require("express");
const Product = express.Router();

const { ProductController } = require("../../controllers");
const { searchValidation } = require("../../middlewares/validation");

Product.get("/:id/details", ProductController.productGetOne);

Product.get("/search", searchValidation, ProductController.productSearch);

Product.get("/getAll", ProductController.productGetAll);

module.exports = Product;
