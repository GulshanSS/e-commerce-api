const express = require("express");
const Product = express.Router();

const { ProductController } = require("../controllers"); 
const { validateProduct } = require("../middlewares/validation")

Product.post("/", validateProduct, ProductController.productAdd);

module.exports = Product;
