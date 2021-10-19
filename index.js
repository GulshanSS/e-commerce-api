const express = require("express");
const passport = require("passport");
const app = express();

const config = require("./config");
const { ProductRoutes, UserRoutes } = require("./routes");

require("dotenv").config();
const PORT = process.env.PORT;

config.DBConfig();
config.CloudinaryConfig();
app.use(express.json());

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/product", passport.authenticate('jwt', {session: false}), ProductRoutes);
app.use("/user", UserRoutes);

app.listen(PORT || 3000, () => {
  console.log(`Server Started at ${PORT}`);
});
