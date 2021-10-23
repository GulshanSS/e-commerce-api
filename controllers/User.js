const { User, Product } = require("../models");
const bcrypt = require("bcrypt");
const isEmpty = require("is-empty");

module.exports = {
  userGetAll: async (req, res) => {
    try {
      const users = await User.find({});
      return res.status(200).json(users);
    } catch (err) {
      return res.status(404).json({ msg: "Error while fetching all users" });
    }
  },
  userGetOne: async (req, res) => {
    try {
      const user = await User.findById({ _id: req.params.id });
      return res.status(200).json(users);
    } catch (err) {
      return res.status(404).json({ msg: "No such user with that id" });
    }
  },
  userDelete: async (req, res) => {
    try {
      const user = User.findById({ _id: req.params.id });
      await user.remove();
      return res.status(200).json({ msg: "User deleted Successfully" });
    } catch (err) {
      return res.status(404).json({ msg: "Error while deleting user" });
    }
  },
  userCart: (req, res) => {
    try {
      let cart = [];
      req.user.cart.forEach(async (ele, i) => {
        cart.push(await Product.findById(ele));
      });
      return res.status(200).json(cart);
    } catch (err) {
      return res.status(404).json({ msg: "No Products added to cart" });
    }
  },
  userAddToCart: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (
        user.cart.find((ele) => req.params.id.toString() === ele.toString())
      ) {
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
      return res.status(202).json({ msg: "Product added to cart" });
    } catch (err) {
      return res.status(404).json({ msg: "Failed to add to cart" });
    }
  },
  userOrder: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (
        user.cart.find((ele) => req.params.id.toString() === ele.toString())
      ) {
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
    } catch (err) {
      return res.status(404).json({ msg: "Unable to buy this product" });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const errors = {}
      const oldPassword = req.body.oldpassword;
      const newPassword = req.body.newpassword;
      const confirmPassword = req.body.confirmpassword;
      const isMatch = await bcrypt.compare(oldPassword, req.user.password);
      if (isMatch) {
        if (oldPassword === newPassword) {
          errors.match = "You can't set same password again"
        }
        if (newPassword != confirmPassword) {
          errors.compare = "New password and Confirm password are not same!"
        }else {
          hash = await bcrypt.hash(newPassword, 10);
          const user = await User.findByIdAndUpdate(
            { _id: req.user._id },
            {
              $set: {
                password: hash,
              },
            }
          );
          req.user = user;
        }
      }else {
        errors.retry = "Incorrect old password"
      }
      if(isEmpty(errors)){
        return res
          .status(200)
          .json({ msg: "Password has been reset sucessfully!" });
      }
      return res.json(errors)
    } catch (err) {
      return res.status(400).json({"msg" : "Couldn't reset password, try again"})
    }
  },
};
