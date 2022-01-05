const cloudinary = require("cloudinary").v2;
const asyncHandler = require("../middlewares/asyncHandler");


const CloudinaryPreSets = (section, name) => {
  return {
    folder: `eCommerce/products/${section}`,
    use_filename: true,
    filename_override: `${name}-${new Date().toUTCString()}`,
    unique_filename: false,
  };
};

module.exports.CloudinaryUpload = asyncHandler(async (image, section, name) => {
  const result = await cloudinary.uploader.upload(
    image,
    CloudinaryPreSets(section, name)
  );
  return {
    cloudinary_ID: result.public_id,
    path: result.url,
  };
});

module.exports.DeleteImage = asyncHandler(async (id) => {
  if (id != process.env.PRODUCT_DEFAULT_PUBLIC_ID) {
    await cloudinary.uploader.destroy(id);
  }
});
