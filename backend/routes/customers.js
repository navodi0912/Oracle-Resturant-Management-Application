const router = require("express").Router();
let Customer = require("../models/Customer");
// const Customer = require("../models/Customer");

//http://localhost:8070/customer/add

router.route("/add").post((req,res)=> {

    const CustomerName = req.body.CustomerName;
    const ContactNo = Number(req.body.ContactNo);
    const Address = req.body.Address;
    const Email = req.body.Email;
    const FullName = req.body.FullName;

    const newCustomer = new Customer ({

        CustomerName,
        ContactNo,
        Address,
        Email,
        FullName
    })

    newCustomer.save().then(()=> {
        res.json("Customer Added Successfully")
    }).catch((err)=> {
        console.log(err);
    })

})

//http://localhost:8070/customer

router.route("/").get((req,res) => {

    Customer.find().then((customer) => {
        res.json(customer)
    }).catch((err) => {
        console.log(err)
    })
})

//http://Localhost:8070/supplier/update

router.route("/update/:id").put(async (req,res)=>{
    let userId = req.params.id;
    const {CustomerName,ContactNO,Address,Email,FullName} = req.body;

    const updateCustomer = {
        CustomerName,
        ContactNO,
        Address,
        Email,
        FullName
    }

    await Customer.findByIdAndUpdate(userId,updateCustomer)
    .then(()=>{
        res.status(200).send({status:"User Updated" })
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data", error: err.message});

    })
})

//http://Localhost:8070/customer/delete

router.route("/delete/:id").delete(async (req, res)=> {
    let userId = req.params.id;

    await Customer.findByIdAndDelete(userId).then(()=> {
        res.status(200).send({status: "User deleted Successfully",});
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

//http://Localhost:8070/customer

router.route("/get/:id").get(async(req,res)=> {
    let userId = req.params.id;
    await Customer.findById(userId).then((customer)=> {
        res.status(200).send({status: "User fetched", customer})
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

module.exports = router;









//suppliername = customername
//products = FullName
