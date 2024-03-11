const router = require("express").Router();
let Orderadmin = require("../models/Orderadmin.js");

router.route("/add").post((req, res) => {
    const total = Number(req.body.total);
    
    const orderadminItem = new Orderadmin({
        total
    })
    orderadminItem.save().then(() => {
        res.json({status: "Product added successfully!"});
    }).catch((err) => {
        console.log(err);
    });
})

router.route("/").get((req, res) => {
    Orderadmin.find().then((orderadminItems)=>{
        res.json(orderadminItems);
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Orderadmin.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "User deleted"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with deleting user"});
    });
})

module.exports = router;