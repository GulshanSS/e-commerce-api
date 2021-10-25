const express = require("express");
const Product = express.Router();

const { ProductController } = require("../../controllers");
const { validateProduct } = require("../../middlewares/validation");
const { grantAccess } = require("../../middlewares/auth");

Product.post(
  "/add",
  validateProduct,
  grantAccess("updateAny", "product"),
  ProductController.productAdd
);

Product.get(
  "/:id/details",
  grantAccess("updateAny", "product"),
  ProductController.productGetOne
);

Product.put(
  "/:id/update",
  grantAccess("updateAny", "product"),
  validateProduct,
  ProductController.productUpdate
);

Product.delete(
  "/:id/delete",
  grantAccess("deleteAny", "product"),
  ProductController.productDelete
);

Product.get(
  "/getAll",
  grantAccess("updateAny", "product"),
  ProductController.productGetAll
);

module.exports = Product;