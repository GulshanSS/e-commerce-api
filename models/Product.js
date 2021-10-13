const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  img: {
    cloudinary_ID: {
      type: String,
    },
    path: {
      type: String,
    },
  },
  likes: {
    type: String,
    default: 0,
  },
  section: {
    type: [],
    required: true,
  },
  cart: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  order: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("product", ProductSchema);
