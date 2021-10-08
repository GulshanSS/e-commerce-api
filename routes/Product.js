const express = require("express");
const Product = express.Router();

const { ProductController } = require("../controllers"); 

Product.get("/");

module.exports = Product;
