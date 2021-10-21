const express = require("express");
const passport = require("passport");
const app = express();

const config = require("./config");
const { ProductRoutes, AuthRoutes } = require("./routes");

require("dotenv").config();
const PORT = process.env.PORT;

config.DBConfig();
config.CloudinaryConfig();
app.use(express.json());

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    const accessToken = req.headers["x-access-token"];
    const { userId, role } = await jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );
    //  // Check if token has expired
    //  if (exp < Date.now().valueOf() / 1000) {
    //   return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
    //  }
    res.user.role = role;
    next();
  } else {
    next();
  }
});

app.use(
  "/product",
  passport.authenticate("jwt", { session: false }),
  ProductRoutes
);
app.use("/", AuthRoutes);

app.listen(PORT || 3000, () => {
  console.log(`Server Started at ${PORT}`);
});
