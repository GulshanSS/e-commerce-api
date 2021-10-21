const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateProduct(req, res, next) {
  let errors = {};
  req.body.name = !isEmpty(req.body.name)
    ? Validator.trim(Validator.escape(req.body.name))
    : "";
  req.body.prices = !isEmpty(req.body.prices)
    ? Validator.trim(Validator.escape(req.body.prices))
    : "";
  req.body.details = !isEmpty(req.body.details)
    ? Validator.trim(Validator.escape(req.body.details))
    : "";
  req.body.section = !isEmpty(req.body.section)
    ? Validator.trim(Validator.escape(req.body.section))
    : "";

  //Name Check
  if (Validator.isEmpty(req.body.name)) {
    errors.name = "Product Name required";
  }

  //Price Check
  if (Validator.isEmpty(req.body.price)) {
    errors.price = "Product Price required";
  } else if (!Validator.isFloat(req.body.price)) {
    errors.price = "Enter Valid Product Price";
  }

  //Details Check
  if (Validator.isEmpty(req.body.details)) {
    errors.details = "Product Details required";
  }

  //Section Check
  if (Validator.isEmpty(req.body.section)) {
    errors.section = "Product Section required";
  }

  return isEmpty(errors) ? next() : res.status(404).json(errors);
};
