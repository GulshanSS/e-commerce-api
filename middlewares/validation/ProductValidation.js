const Validator = require("validator");
const isEmpty = require("is-empty");

const { Product } = require("../../models");
const { Validation } = require("../../utils");

module.exports = {
  validateProduct: (req, res, next) => {
    let errors = {};
    //name check
    if (req.body.name === "") {
      errors.name = "Product Name required";
    } else if (typeof req.body.name != "undefined") {
      req.body.name = Validator.trim(Validator.escape(req.body.name));
    }

    //Price Check
    if (req.body.price === "") {
      errors.price = "Price is required";
    } else if (typeof req.body.price != "undefined") {
      if (!Validator.isFloat(req.body.price)) {
        errors.price = "Enter valid product price";
      } else {
        req.body.price = Validator.trim(Validator.escape(req.body.price));
      }
    }

    //Details Check
    if (req.body.details === "") {
      errors.details = "Details Name required";
    } else if (typeof req.body.details != "undefined") {
      req.body.details = Validator.trim(Validator.escape(req.body.details));
    }

    //Section Check
    if (req.body.section === "") {
      errors.section = "Section required";
    } else if (typeof req.body.section != "undefined") {
      req.body.section = Validator.trim(Validator.escape(req.body.section));
    }
    return isEmpty(errors) ? next() : res.status(404).json(errors);
  },
  productCheck: async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product Not Found" });
    } else {
      next();
    }
  },
  searchValidation: async (req, res, next) => {
    req.body.search = Validation.sanitizeAndValidate(req.body.search);
    if (req.body.search === ""){
      products = await Product.find({});
      return res
        .status(200)
        .json({ msg: "Please enter a keyword to search", products });
    }
    next();
  },
};
