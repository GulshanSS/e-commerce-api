const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateProduct(req, res, next) {
    let errors = {};
    req.body.name = !isEmpty(req.body.name) ? req.body.name : "";
    req.body.prices = !isEmpty(req.body.prices) ? req.body.prices : "";
    req.body.details = !isEmpty(req.body.details) ? req.body.details : "";
    req.body.section = !isEmpty(req.body.section) ? req.body.section : "";

    if (Validator.isEmpty(req.body.name)) {
        errors.name = "Product Name required";
    }
    if (Validator.isEmpty(req.body.price)) {
        errors.price = "Product Price required";
    }
    if (Validator.isEmpty(req.body.details)) {
        errors.details = "Product Details required";
    }
    if (Validator.isEmpty(req.body.section)) {
        errors.section = "Product Section required";
    }

    return isEmpty(errors) ? next() : res.status(404).json(errors);
};
