const mongoose = require("mongoose");
const { Cloudinary } = require("../utils");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Minimum price is Rs. 0"],
  },
  details: {
    type: String,
    required: [true, "Description is required"],
  },
  img: {
    cloudinary_ID: {
      type: String,
    },
    path: {
      type: String,
    },
    origin_path: {
      type: String,
    },
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    //required: true,
    ref: "user",
  },
  likes: {
    count: {
      type: Number,
      default: 0,
    },
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
    },
  },
  section: {
    type: String,
    required: [true, "Section is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

ProductSchema.pre("save", async function (next) {
  if (!this.isModified("img.origin_path")) {
    next();
  } else if (
    this.isModified("img.origin_path") &&
    this.img.origin_path != process.env.PRODUCT_DEFAULT_NAME
  ) {
    await Cloudinary.DeleteImage(doc.img.cloudinary_ID);
  }

  if (this.img.origin_path === "undefined" || this.img.origin_path === "") {
    this.img.origin_path = process.env.PRODUCT_DEFAULT_NAME;
    this.img.cloudinary_ID = process.env.PRODUCT_DEFAULT_PUBLIC_ID;
    this.img.path = process.env.PRODUCT_DEFAULT_URL;
  } else {
    this.img = await Cloudinary.CloudinaryUpload(
      req.body.image,
      req.body.section,
      req.body.name
    );
  }

  next();
});

ProductSchema.post("remove", async function (doc, next) {
  if (this.img.origin_path != process.env.PRODUCT_DEFAULT_NAME) {
    await Cloudinary.DeleteImage(doc.img.cloudinary_ID);
  }
  next();
});

module.exports = mongoose.model("product", ProductSchema);
