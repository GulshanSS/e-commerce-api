const express = require("express");
const Product = express.Router();

const { ProductController } = require("../controllers");
const { validateProduct } = require("../middlewares/validation");

Product.post("/", validateProduct, ProductController.productAdd);
Product.get("/:id", ProductController.productGetOne);
Product.put("/:id/update", ProductController.productUpdate);
Product.delete("/:id/delete", ProductController.productDelete);
Product.get("/getAll", ProductController.productGetAll);

module.exports = Product;
