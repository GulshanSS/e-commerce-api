const { Product } = require("../models");
const cloudinary = require("cloudinary").v2;
const { CloudinaryPreSets } = require("../config");

module.exports = {
    productAdd: (req, res) => {
        cloudinary.uploader
            .upload(req.body.image, CloudinaryPreSets(req, res))
            .then((result) => {
                const product = new Product({
                    name: req.body.name,
                    price: req.body.price,
                    details: req.body.details,
                    section: req.body.section,
                    img: {
                        cloudinary_ID: result.public_id,
                        path: result.url,
                    },
                });
                product
                    .save()
                    .then(() => {
                        return res.status(201).json({ msg: "Product Saved" });
                    })
                    .catch((err) => {
                        return res
                            .status(404)
                            .json({ msg: "Error while saving the product" });
                    });
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(404)
                    .json({ msg: "Please check with the image" });
            });
    },

    productGetOne: (req, res) => {
        Product.findById({ _id: req.params.id }, (err, product) => {
            if (!err) {
                return res.status(201).json(product);
            }
            return res.status(404).json({ msg: "Product not found" });
        });
    },

    productUpdate: (req, res) => {
        Product.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    price: req.body.price,
                    details: req.body.details,
                },
            }
        )
            .then(() => {
                return res.status(200).json({ msg: "product updated" });
            })
            .catch((err) => {
                return res.status(404).json({ msg: "Error while updating" });
            });
    },

    productDelete: (req, res) => {
        Product.remove({ _id: req.params.id }, (err) => {
            if (!err) {
                return res.status(200).json({ msg: "product deleted" });
            }
            return res
                .status(404)
                .json({ msg: "Error while deleting product" });
        });
    },

    productGetAll: (req, res) => {
        Product.find({}, (err, products) => {
            if (!err) {
                return res.status(200).json(products);
            }
            return res
                .status(404)
                .json({ msg: "Error while fetching all products" });
        });
    },
};
