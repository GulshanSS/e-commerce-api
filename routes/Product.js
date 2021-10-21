const express = require("express");
const Product = express.Router();

const { ProductController } = require("../controllers");
const { validateProduct } = require("../middlewares/validation");
const {grantAccess} = require("../middlewares/auth")

Product.post("/add", validateProduct, grantAccess.grantAccess('updateAny','product'),ProductController.productAdd);
Product.get("/:id/details", grantAccess.grantAccess('readAny','product'),ProductController.productGetOne);
Product.put("/:id/update", grantAccess.grantAccess('updateAny', 'product'),validateProduct, ProductController.productUpdate);
Product.delete("/:id/delete", grantAccess.grantAccess('deleteAny', 'product'),ProductController.productDelete);
Product.get("/getAll", grantAccess.grantAccess('readAny','product'),ProductController.productGetAll);

module.exports = Product;
