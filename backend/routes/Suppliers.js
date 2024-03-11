const router = require("express").Router();
let Supplier = require("../models/Supplier");


//http://Localhost:8070/Supplier/add

router.route("/add").post((req,res)=>{

    const SupplierName = req.body.SupplierName;
    const ContactNo= req.body.ContactNo;
    const Address = req.body.Address;
    const Email = req.body.Email;
    const Products= req.body.Products;

    const newSupplier = new Supplier({

        SupplierName,
        ContactNo,
        Address,
        Email,
        Products

    })

    newSupplier.save().then(()=>{
        res.json("Supplier Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//http://Localhost:8070/Supplier

router.route("/").get((req,res)=>{

    Supplier.find().then((suppliers)=>{
        res.json(suppliers)
    }).catch((err)=>{
        console.log(err)
    })

})

//http://Localhost:8070/supplier/update

router.route("/update/:id").put(async (req,res)=>{
    let userId = req.params.id;
    const {SupplierName,ContactNo,Address,Email,Products} = req.body;

    const updateSupplier = {
        SupplierName,
        ContactNo,
        Address,
        Email,
        Products
    }

    await Supplier.findByIdAndUpdate(userId,updateSupplier)
    .then(()=>{
        res.status(200).send({status:"User Updated" })
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data", error: err.message});

    })
})

//http://Localhost:8070/supplier/delete/5fsadfsad

router.route("/delete/:id").delete(async (req, res)=>{
    let userId = req.params.id;

     await Supplier.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted",});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

//http://Localhost:8070/supplier/
router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
    await Supplier.findById(userId)
    .then((supplier)=>{
        res.status(200).send({status: "User fetched", supplier})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})
    
module.exports = router;