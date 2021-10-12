const { Product } = require("../models");

module.exports = {
    productAdd: (req, res) => {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            details: req.body.details,
            section: req.body.section,
        });
        product
            .save()
            .then(() => {
                return res.status(201).json({ msg: "Product Saved" });
            })
            .catch((err) => {
                return res
                    .status(404)
                    .json({ msg: "Error while saving the product" });
            });
    },

    productGetOne: (req, res) => {
        Product.findById({ _id: req.params.id }, (err, product) => {
            if (!err) {
                return res.status(201).json(product);
            }
            return res.status(404).json({ msg: "Product not found" });
        });
    },
    productUpdate: (req, res) =>{
        Product.findByIdAndUpdate({_id: req.params.id},{$set:{
            name:req.body.name,
            price : req.body.price,
            details : req.body.details
        }}).then(()=>{
            return res.status(200).json({"msg" : "product updated"});
        }).catch((err) =>{
            return res.status(404).json({"msg" : "Error while updating"});
        });
    },
    productDelete : (req, res) =>{
        Product.remove({_id : req.params.id}, (err) =>{
            if(!err){
                return res.status(200).json({"msg" : "product deleted"});
            }else{
                return res.status(404).json({"msg" : "Error while deleting product"});
            }
        });
    },
    productGetAll : (res) =>{
        Product.find({},(err, product) =>{
            if(!err){
                return res.status(200).json(product);
            }else{
                return res.status(404).json({"msg" : "Error while fetching all products"})
            }
        });
    }
};
