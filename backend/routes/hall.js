const router = require("express").Router();
let Hall = require("../models/Hall");


router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const rentperday = req.body.rentperday;
    const facility = req.body.facility;
    const description = req.body.description;
    const imageurls = req.body.imageurls;
   

    const newHall = new Hall({

        name,
        rentperday,
        facility,
        description,
        imageurls,
        
        
    })

    newHall.save().then(()=>{

        res.json("Hall Added")
    }).catch((err)=>{

        console.log(err);
    })
        
})


router.route("/").get((req,res)=>{

    Hall.find().then((halls)=>{

        res.json(halls)

    }).catch((err)=>{

        console.log(err)
    })
})


router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const hall = await Package.findById(userId)
    .then((hall)=> {
        res.status(200).send({status: "Hall fetched", hall}); 
    })
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with item"});
    })
})


router.route("/update/:name").put(async(req,res)=>{

    let hallId = req.params.name;
    
    const name = req.body.name;
    const rentperday = req.body.rentperday;
    const facility = req.body.facility;
    const description = req.body.description;
    const imageurls = req.body.imageurls;
   

    const updateHall = {

        name,
        rentperday,
        facility,
        description,
        imageurls,

    }

    const update = await Hall.findOneAndUpdate(hallId,updateHall)
    .then(()=>{

    res.status(200).send({status:"Hall updated"})

    }).catch((err)=>{

        res.status(500).send({status:"Error with updating data",error :err.message});

    })
})

router.route("/delete/:name").delete(async(req,res)=>{

    let hallId =req.params.name;
    await Hall.findOneAndDelete(hallId)
    .then(()=>{

        res.status(200).send({status: "Hall Deleted"});

    }).catch((err)=>{

        console.log(err.message);
        res.status(500).send({status:"Error with Delete Hall", error:err.message});
    })
})




module.exports= router;