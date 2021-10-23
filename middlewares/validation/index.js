const { validateProduct, productCheck } = require("./ProductValidation");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("./UserValidation");

module.exports = {
  validateProduct,
  productCheck,
  validateRegisterInput,
  validateLoginInput,
};
