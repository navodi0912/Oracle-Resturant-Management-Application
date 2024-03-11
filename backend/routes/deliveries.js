//importing the Router package in express
const router = require("express").Router();

//importing the student file from models
let delivery = require("../models/delivery");

//CREATE function (route)
router.route("/add").post((req,res)=>{
    const cusName = req.body.cusName;
    const cusContact = Number(req.body.cusContact);
    const delAddress = req.body.delAddress;

    //Initializing the above properties
    const newDelivery = new delivery({
        cusName,
        cusContact,
        delAddress
    })

    //passing the newDelivery object to the mongoDB
    newDelivery.save().then(() => {
        res.json("Delivery Added")
    }).catch ((err) => {
        console.log(err);
    })
})



//RETRIEVE Function (retrieve all the deliveries)
router.route("/").get((req,res) => {
    delivery.find().then((deliveries) => {
        res.json(deliveries)
    }).catch((err) => {
        console.log(err);
    })
})



//UPDATE Function
router.route("/update/:id").put(async(req,res) => {
    let ID = req.params.id;
    const {cusName, cusContact, delAddress, delRider} = req.body;

    const updateDelivery = {
        cusName, 
        cusContact,
        delAddress,
        delRider
    }

    const update = await delivery.findByIdAndUpdate(ID, updateDelivery).then(() => {
        res.status(200).send({status : "Delivery Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error in updating data", error: err.message});
    })
})


//DELETE Function
router.route("/delete/:id").delete(async(req, res) => {
    let ID = req.params.id;
    await delivery.findByIdAndDelete(ID).then(() => {
        res.status(200).send({status: "Delivery Deleted"});
    }).catch ((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error in deleting the delivery", error: err.message});
    })
})



//Retrieving details of a single delivery
router.route("/get/:id").get(async(req, res) => {
    let ID = req.params.id;
    const deliv = await delivery.findById(ID).then((delivery) => {
        res.status(200).send({status: "Delivery details fetched", delivery})
    }).catch((err) => {
        console.log(err.meesage);
        res.status(500).send({status: "Error in fetching details", error: err.message});
    })
})



module.exports = router;