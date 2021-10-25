const isEmpty = require("is-empty");
const Validator = require("validator");

exports.sanitizeAndValidate = (data) => {
  return !isEmpty(data) ? Validator.trim(Validator.escape(data)) : "";
};
