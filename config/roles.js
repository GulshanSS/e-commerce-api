const AccessControl = require("accesscontrol");
const ac = new AccessControl();

module.exports = {
  roles: (() => {
    ac.grant("user").readOwn("profile");
    ac.grant("vendor").extend("user").updateOwn("product").deleteOwn("product");
    ac.grant("admin").extend("user").readAny("profile").deleteAny("profile");
    return ac;
  })(),
};
