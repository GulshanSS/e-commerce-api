const express = require("express");
const passport = require("passport");
const app = express();

const config = require("./config");
const { createAdmin } = require("./middlewares/auth");
const Admin = require("./routes/Admin");
const Customer = require("./routes/Customer");
const Vendor = require("./routes/Vendor");
const Public = require("./routes/Public");
const { AuthRoutes } = require("./routes/Auth");

require("dotenv").config();

config.DBConfig();
config.CloudinaryConfig();
app.use(express.json());

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(createAdmin);

app.use("/admin", passport.authenticate("jwt", { session: false }), [
  Admin.UserRoutes,
]);
app.use("/customer", passport.authenticate("jwt", { session: false }), [
  Customer.UserRoutes,
]);
app.use("/vendor", passport.authenticate("jwt", { session: false }), [
  Vendor.ProductRoutes,
  Vendor.UserRoutes,
]);

app.use("/", [AuthRoutes, Public.ProductRoutes]);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});
