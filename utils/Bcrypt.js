const bcrypt = require("bcrypt");
const asyncHandler = require("../middlewares/asyncHandler");


exports.genHash = asyncHandler(async (data) => {
  return await bcrypt.hash(data, 10);
});

exports.comparePass = asyncHandler(async (pass, hash) => {
  return await bcrypt.compare(pass, hash);
});
