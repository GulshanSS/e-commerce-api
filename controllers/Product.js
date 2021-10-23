const isEmpty = require("is-empty");

const { Product } = require("../models");
const cloudinary = require("cloudinary").v2;
const { Cloudinary } = require("../utils");

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
      const product = new Product({
        name: req.body.name,
        price: req.body.price,
        details: req.body.details,
        section: req.body.section,
        img: imageDetails,
      });
      await product.save();
      return res.status(201).json({ msg: "Product Saved" });
    } catch (err) {
      await Cloudinary.DeleteImage(imageDetails.cloudinary_ID);
      return res.status(404).json({ msg: "Error saving product details" });
    }
  },

  productGetOne: async (req, res) => {
    try {
      const product = await Product.findById({ _id: req.params.id });
      return res.status(201).json(product);
    } catch (err) {
      return res.status(404).json({ msg: "Product not found" });
    }
  },

  productUpdate: async (req, res) => {
    try {
      let imageDetails = {};
      const product = await Product.findById(req.params.id);
      if (typeof req.body.image != "undefined") {
        // Image Upload
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
      return res.status(200).json({ msg: "Product Updated" });
    } catch (err) {
      await Cloudinary.DeleteImage(imageDetails.cloudinary_ID); // Delete image
      return res.status(404).json({ msg: "Cannot Update Data" });
    }
  },

  productDelete: async (req, res) => {
    try {
      const product = await Product.findById({ _id: req.params.id });
      await cloudinary.uploader.destroy(product.img.cloudinary_ID);
      await product.remove({ _id: product.id });
      return res.status(200).json({ msg: "product deleted" });
    } catch (err) {
      return res.status(404).json({ msg: "Error deleting product" });
    }
  },

  productGetAll: async (req, res) => {
    try {
      const products = await Product.find({});
      return res.status(200).json(products);
    } catch (err) {
      return res.status(404).json({ msg: "Error while fetching all products" });
    }
  },
};
