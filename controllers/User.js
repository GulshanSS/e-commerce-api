const { User } = require("../models");

module.exports = {
    userAdd : (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password : req.body.password,
            mobile_no : req.body.mobile,
            gender : req.body.gender,
            dob : Date.now()
        }).save().then(() => {
            return res.status(201).json({"msg" : "user Added successfully"})
        }).catch((err) =>{
            return res.status(404).json({"msg" : "Error while adding user"})
        })
    },
}
    
