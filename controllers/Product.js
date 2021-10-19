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
        .catch(async () => {
          await Cloudinary.DeleteImage(imageDetails.cloudinary_ID);
          return res.status(404).json({ msg: "Error saving product details" });
        });
    } catch (err) {
      return res.status(404).json({ msg: err });
    }
  },

  productGetOne: (req, res) => {
    Product.findById({ _id: req.params.id })
      .then((product) => {
        return res.status(201).json(product);
      })
      .catch((err) => {
        return res.status(404).json({ msg: "Product not found" });
      });
  },

  productUpdate: (req, res) => {
    let imageDetails = {};
    //Product Find By ID
    Product.findById(req.params.id)
      .then(async (product) => {
        if (req.body.image) {
          // Image Upload
          imageDetails = await Cloudinary.CloudinaryUpload(
            req.body.image,
            req.body.section,
            req.body.name
          );
          await Cloudinary.DeleteImage(product.img.cloudinary_ID);
        } else {
          imageDetails = product.img;
        }
        return imageDetails;
      })
      .then((imageDetails) => {
        // Update Data
        return Product.findByIdAndUpdate(
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
        );
      })
      .then(() => {
        return res.status(200).json({ msg: "Product Updated" });
      })
      .catch(async (err) => {
        await Cloudinary.DeleteImage(imageDetails.cloudinary_ID); // Delete image
        if (typeof err != "string") err = "Could not update Data";
        return res.status(404).json({ msg: err });
      });
  },

  productDelete: (req, res) => {
    Product.findById({ _id: req.params.id })
      .then(async (product) => {
        await cloudinary.uploader.destroy(product.img.cloudinary_ID);
        product.remove({ _id: product.id });
      })
      .then(() => {
        return res.status(200).json({ msg: "product deleted" });
      })
      .catch((err) => {
        return res.status(404).json({ msg: "Error deleting product" });
      });
  },

  productGetAll: (req, res) => {
    Product.find({})
      .then((products) => {
        return res.status(200).json(products);
      })
      .catch((err) => {
        return res
          .status(404)
          .json({ msg: "Error while fetching all products" });
      });
  },
};
