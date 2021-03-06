const bcrypt = require("bcrypt");
const isEmpty = require("is-empty");

const { User, Product } = require("../models");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middlewares/asyncHandler");

exports.userGetAll = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  if (!users) {
    next(new ErrorHandler(404, "User not found"));
  }
  return res.status(200).json(users);
});

exports.userGetOne = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    next(new ErrorHandler(404, "User not found"));
  }
  return res.status(200).json(user);
});

exports.userDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    next(new ErrorHandler(401, "Please Login to see the details"));
  }
  return res.status(200).json(user);
});

exports.userDelete = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    id: req.params.id,
    deleteApproval: true,
    role: "vendor",
  });
  if (!user) {
    next(new ErrorHandler(404, "Check with the vendor"));
  }
  await Product.deleteMany({ vendor: req.params.id });
  await user.remove();
  return res.status(200).json({ msg: "Vendor deleted Successfully" });
});

exports.userCart = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("cart");
  if (isEmpty(user.cart)) {
    next(new ErrorHandler(404, "No Products added to cart"));
  }
  return res.status(200).json(user.cart);
});

exports.userAddToCart = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.cart.find((ele) => req.params.id.toString() === ele.toString())) {
    return res
      .status(200)
      .json({ msg: "Product Already Available in the cart" });
  }
  if (!user.cart) {
    user.cart.push(req.params.id);
  } else {
    user.cart.push(req.params.id);
  }
  await User.findByIdAndUpdate(req.user._id, {
    $set: {
      cart: user.cart,
    },
  });
  return res.status(201).json({ msg: "Product added to cart" });
});

exports.userMyOrder = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("order");
  if (isEmpty(user.order)) {
    next(new ErrorHandler(404, "No Products Bought"));
  }
  return res.status(200).json(user.order);
});

exports.userOrder = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.cart.find((ele) => req.params.id.toString() === ele.toString())) {
    user.cart = [...user.cart].filter(
      (ele) => req.params.id.toString() != ele.toString()
    );
  }
  user.order.push(req.params.id);
  await User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        order: user.order,
        cart: user.cart,
      },
    }
  );
  const product = await Product.findById(req.params.id);
  return res.status(202).json({
    msg: "Product bought",
    Summary: {
      name: `${product.name}`,
      price: "Rs " + `${product.price}`,
    },
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const isMatch = await bcrypt.compare(req.body.oldpassword, req.user.password);
  if (isMatch) {
    if (req.body.oldpassword === req.body.newpassword) {
      next(new ErrorHandler(400, "You can't set same password again"));
    }
    hash = await bcrypt.hash(req.body.newpassword, 10);
    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          password: hash,
        },
      }
    );
    req.user = user;
    return res.status(202).json({ msg: "Password reset sucessful!" });
  } else {
    next(new ErrorHandler(406, "Old password is not correct"));
  }
});

exports.likeProduct = asyncHandler(async (req, res, next) => {
  let updatedUsers = [];
  const product = await Product.findById(req.params.id);
  if (!product) {
    next(new ErrorHandler(404, "Product Not Found"));
  }
  if (
    product.likes.users.find(
      (ele) => req.user._id.toString() === ele.toString()
    )
  ) {
    product.likes.count -= 1;
    updatedUsers = [...product.likes.users].filter(
      (ele) => req.user._id.toString() != ele.toString()
    );
  } else {
    product.likes.count += 1;
    updatedUsers.push(req.user._id);
  }
  product.likes.users = updatedUsers;
  await product.save();
  return res.status(202).json(product);
});

exports.deleteApproval = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id, role: "vendor" });
  if (!user) {
    next(new ErrorHandler(404, "Vendor Not Found"));
  }
  user.deleteApproval = true;
  await user.save();
  return res.status(201).json({ msg: "Submitted for Delete Approval" });
});

exports.cancelDeleteApproval = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id, role: "vendor" });
  if (!user) {
    next(new ErrorHandler(404, "Vendor Not Found"));
  }
  user.deleteApproval = false;
  await user.save();
  return res
    .status(202)
    .json({ msg: `Delete Approval Cancel for ${user.name}` });
});
