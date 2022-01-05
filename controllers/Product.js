const isEmpty = require("is-empty");
const { Product } = require("../models");
const { Cloudinary } = require("../utils");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middlewares/asyncHandler");


module.exports = {
  productAdd: async (req, res) => {
    let imageDetails = {};
    try {
      if (typeof req.body.image != "undefined") {
        imageDetails = await Cloudinary.CloudinaryUpload(
          req.body.image,
          req.body.section,
          req.body.name
        );
      } else {
        imageDetails = {
          cloudinary_ID: process.env.PRODUCT_DEFAULT_PUBLIC_ID,
          path: process.env.PRODUCT_DEFAULT_URL,
        };
      }
      await new Product({
        name: req.body.name,
        price: req.body.price,
        details: req.body.details,
        section: req.body.section,
        img: imageDetails,
        vendor: req.user._id,
      }).save();
      return res.status(201).json({ msg: "Product Saved" });
    } catch (err) {
      await Cloudinary.DeleteImage(imageDetails.cloudinary_ID);
      return res.status(409).json({ msg: "Error saving product details" });
    }
  },

  productGetOne: asyncHandler(async (req, res) => {
    const product = await Product.findById({ _id: req.params.id });
    if (!product) {
      return next(new ErrorHandler(404, "No Product Found"));
    }
    return res.status(201).json(product);
  }),

  productUpdate: async (req, res) => {
    let imageDetails = {};
    try {
      const product = await Product.findOne({
        _id: req.params.id,
        vendor: req.user._id,
      });
      if (!product) {
        next(new ErrorHandler(404, "No Product Found"));
      }
      if (typeof req.body.image != "undefined") {
        imageDetails = await Cloudinary.CloudinaryUpload(
          req.body.image,
          req.body.section || product.section,
          req.body.name || product.name
        );
        await Cloudinary.DeleteImage(product.img.cloudinary_ID);
      } else {
        imageDetails = product.img;
      }
      await Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name || product.name,
            price: req.body.price || product.price,
            details: req.body.details || product.details,
            section: req.body.section || product.section,
            img: imageDetails,
          },
        }
      );
      return res.status(202).json({ msg: "Product Updated" });
    } catch (err) {
      await Cloudinary.DeleteImage(imageDetails.cloudinary_ID); // Delete image
      return res.status(409).json({ msg: "Cannot Update Data" });
    }
  },

  productDelete: asyncHandler(async (req, res) => {
    const product = await Product.findOne({
      _id: req.params.id,
      vendor: req.user._id,
    });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    await Cloudinary.DeleteImage(product.img.cloudinary_ID);
    await product.remove({ _id: product.id });
    return res.status(200).json({ msg: "Product deleted" });
  }),

  productGetAll: async (req, res, next) => {
    try {
      const products = await Product.find({});
      if (products) {
        return next(new ErrorHandler(404, "No Product Found"));
      }
      return res.status(200).json(products);
    } catch (err) {
      return next(new ErrorHandler(409, "Error while fetching products"));
    }
  },

  productGetByVendor: asyncHandler(async (req, res) => {
    const products = await Product.find({ vendor: req.user._id });
    if (!products) {
      return next(new ErrorHandler(404, "No Product Found"));
    }
    return res.status(200).json(products);
  }),

  productSearch: asyncHandler(async (req, res) => {
    let products = [];
    let key = new RegExp(".*" + req.body.search + ".*");
    products = await Product.find({
      $or: [{ name: key }, { section: key }],
    });
    if (isEmpty(products)) {
      products = await Product.find({});
      return res.status(204).json({
        msg: "We do not find any product related to your search keyword.",
        products,
      });
    }
    return res.status(200).json({ products });
  }),
};
