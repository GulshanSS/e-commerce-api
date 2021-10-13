const { Product } = require("../models");
const cloudinary = require("cloudinary").v2;
const { Cloudinary } = require("../utils");

module.exports = {
  productAdd: async (req, res) => {
    let imageDetails = {};
    try {
      if (req.body.image) {
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
      product
        .save()
        .then(() => {
          return res.status(201).json({ msg: "Product Saved" });
        })
        .catch((err) => {
          throw new Error("Error while saving the product");
        });
    } catch (err) {
      return res.status(404).json({ msg: err });
    }
  },

  productGetOne: (req, res) => {
    try {
      Product.findById({ _id: req.params.id }, (err, product) => {
        if (!err) {
          return res.status(201).json(product);
        } else {
          throw new Error("Product not found");
        }
      });
    } catch (err) {
      return res.status(404).json({ msg: err });
    }
  },

  productUpdate: (req, res) => {
    let imageDetails = {};
    Product.findById(req.params.id)
      .then(async (product) => {
        if (req.body.image) {
          imageDetails = await Cloudinary.CloudinaryUpload(
            req.body.image,
            req.body.section,
            req.body.name
          );
          if (
            product.img.cloudinary_ID != process.env.PRODUCT_DEFAULT_PUBLIC_ID
          ) {
            await cloudinary.uploader.destroy(product.img.cloudinary_ID);
          }
        } else {
          imageDetails = product.img;
        }
        Product.findByIdAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              name: req.body.name,
              price: req.body.price,
              details: req.body.details,
              section: req.body.section,
              img: imageDetails,
            },
          }
        )
          .then(() => {
            return res.status(200).json({ msg: "Product Updated" });
          })
          .catch((err) => {
            return res
              .status(404)
              .json({ msg: "Error while updating the product" });
          });
      })
      .catch((err) => {
        return res
          .status(404)
          .json({ msg: "Error while updating the product" });
      });
  },

  productDelete: (req, res) => {
    Product.remove({ _id: req.params.id })
      .then(() => {
        return res.status(200).json({ msg: "product deleted" });
      })
      .catch((err) => {
        return res.status(404).json({ msg: "Error deleting product" });
      });
  },

  productGetAll: (req, res) => {
    try {
      Product.find({}, (err, products) => {
        if (products) {
          return res.status(200).json(products);
        } else {
          throw new Error("Error while fetching all products");
        }
      });
    } catch (err) {
      return res.status(404).json({ msg: err });
    }
  },
};
