const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
module.exports = {
    roles: (()=>{
    ac.grant("user")
    .readAny("product")
 
    ac.grant("admin")
    .extend("user")
    .updateAny("product")
    .deleteAny("product")
    return ac
    })()
};