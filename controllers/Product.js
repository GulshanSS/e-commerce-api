const { Product } = require("../models");

module.exports = {
    productAdd: (req, res) => {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            details: req.body.details,
            section: req.body.section,
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
    },
};
