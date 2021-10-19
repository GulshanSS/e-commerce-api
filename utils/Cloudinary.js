const cloudinary = require("cloudinary").v2;

const CloudinaryPreSets = (section, name) => {
  return {
    folder: `eCommerce/products/${section}`,
    use_filename: true,
    filename_override: `${name}-${new Date().toUTCString()}`,
    unique_filename: false,
  };
};

module.exports.CloudinaryUpload = async (image, section, name) => {
  try {
    const result = await cloudinary.uploader.upload(
      image,
      CloudinaryPreSets(section, name)
    );
    return {
      cloudinary_ID: result.public_id,
      path: result.url,
    };
  } catch (err) {
    throw "Error Uploading Image";
  }
};

module.exports.DeleteImage = async (id) => {
  if (id != process.env.PRODUCT_DEFAULT_PUBLIC_ID) {
    await cloudinary.uploader.destroy(id);
  }
};
