const router = require("express").Router();
let Package = require("../models/Package");

router.route("/add").post((req,res)=>{

    const packageid = req.body.packageid;
    const name = req.body.name;
    const items = req.body.items;
    const price = Number(req.body.price);
    const imageurls=req.body.imageurls;


    const newPackage = new Package({

        packageid,
        name,
        items,
        price,
        imageurls,
        

        
    })

    newPackage.save().then(()=>{

        res.json("Package Added")
    }).catch((err)=>{

        console.log(err);
    })
        
})


router.route("/").get((req,res)=>{

    Package.find().then((packages)=>{

        res.json(packages)

    }).catch((err)=>{

        console.log(err)
    })
})


router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const package = await Package.findById(userId)
    .then((package)=> {
        res.status(200).send({status: "Package fetched", package}); 
    })
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with item"});
    })
})

router.route("/update/:id").put(async(req,res)=>{

    let packageId = req.params.id;
    
    const packageid = req.body.packageid;
    const name = req.body.name;
    const items = req.body.items;
    const price = Number(req.body.price);
    const imageurls=req.body.imageurls;
    

    const updatePackage = {

        packageid,
        name,
        items,
        price,
        imageurls,


    }

    const update = await Package.findByIdAndUpdate(packageId,updatePackage)
    .then(()=>{

    res.status(200).send({status:"Package updated"})

    }).catch((err)=>{

        res.status(500).send({status:"Error with updating data",error :err.message});

    })
})

router.route("/delete/:id").delete(async(req,res)=>{

    let packageId =req.params.id;
    await Package.findByIdAndDelete(packageId)
    .then(()=>{

        res.status(200).send({status: "Package Deleted"});

    }).catch((err)=>{

        console.log(err.message);
        res.status(500).send({status:"Error with Delete Package", error:err.message});
    })
})




module.exports= router;