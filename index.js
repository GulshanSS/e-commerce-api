const express = require("express");
const passport = require("passport");
const app = express();

const config = require("./config");
const { createAdmin } = require("./middlewares/auth");
const Admin = require("./routes/Admin");
const User = require("./routes/User");
const { AuthRoutes } = require("./routes/Auth");

require("dotenv").config();
const PORT = process.env.PORT;

config.DBConfig();
config.CloudinaryConfig();
app.use(express.json());

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(createAdmin);

app.use("/product", passport.authenticate("jwt", { session: false }), [
  Admin.ProductRoutes,
  Admin.UserRoutes,
]);
app.use("/user", passport.authenticate("jwt", { session: false }), [
  User.ProductRoutes,
  User.UserRoutes,
]);
app.use("/", AuthRoutes);

app.listen(PORT || 3000, () => {
  console.log(`Server Started at ${PORT}`);
});
