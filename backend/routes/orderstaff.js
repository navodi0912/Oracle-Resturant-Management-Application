const router = require("express").Router();
let Orderstaff = require("../models/Orderstaff.js");

router.route("/add").post((req, res) => {
    // const products = req.body.product;
    // console.log(products);
    // const orderstaffItem = new Orderstaff({
    //     product:products
    // })

    const productsMap = new Map(Object.entries(req.body.product));
    const orderstaffItem = new Orderstaff({
        products: productsMap
    })
    console.log(productsMap);
    orderstaffItem.save().then(() => {
        res.json({status: "Product added successfully!"});
    }).catch((err) => {
        console.log(err);
    });
})

router.route("/").get((req, res) => {
    Orderstaff.find().then((orderstaffItems)=>{
        res.json(orderstaffItems);
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Orderstaff.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "User deleted"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with deleting user"});
    });
})

module.exports = router;