const { Product } = require("../models");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middlewares/asyncHandler");

exports.productAdd = asyncHandler(async (req, res, next) => {
  await new Product({
    name: req.body.name,
    price: req.body.price,
    details: req.body.details,
    section: req.body.section,
    img: { origin_path: req.body.image },
    vendor: req.user._id,
  }).save();
  return res.status(201).json({ msg: "Product Saved" });
});

exports.productGetOne = asyncHandler(async (req, res, next) => {
  const product = await Product.findById({ _id: req.params.id });
  if (!product) {
    return next(new ErrorHandler(404, "No Product Found"));
  }
  return res.status(201).json(product);
});

exports.productUpdate = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.id,
    vendor: req.user._id,
  });
  if (!product) {
    next(new ErrorHandler(404, "No Product Found"));
  }
  req.body.name ? (product.name = req.body.name) : false;
  req.body.price ? (product.price = req.body.price) : false;
  req.body.details ? (product.details = req.body.details) : false;
  req.body.section ? (product.section = req.body.section) : false;
  req.body.image ? (product.img.origin_path = req.body.image) : false;
  await product.save();
  return res.status(202).json({ msg: "Product Updated" });
});

exports.productDelete = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.id,
    vendor: req.user._id,
  });
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  await product.remove({ _id: product.id });
  return res.status(200).json({ msg: "Product deleted" });
});

exports.productGetAll = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  if (products) {
    return next(new ErrorHandler(404, "No Product Found"));
  }
  return res.status(200).json(products);
});

exports.productGetByVendor = asyncHandler(async (req, res, next) => {
  const products = await Product.find({ vendor: req.user._id });
  if (!products) {
    return next(new ErrorHandler(404, "No Product Found"));
  }
  return res.status(200).json(products);
});
