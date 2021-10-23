const { validateProduct } = require("./ProductValidation");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("./UserValidation");

module.exports = {
  validateProduct,
  validateRegisterInput,
  validateLoginInput,
};
