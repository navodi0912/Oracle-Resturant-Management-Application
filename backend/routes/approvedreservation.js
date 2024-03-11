const router = require("express").Router();
let ApprovedReservation = require("../models/ApprovedReserves");

router.route("/add").post((req,res)=>{

    const nic = req.body.nic;
    const name = req.body.name;
    const phonenumber = Number(req.body.phonenumber);
    const hall = req.body.hall;
    const pack = req.body.pack;
    const date = req.body.date;
    const hallPackagePri=req.body.hallPackagePri
    

    const newReservation = new ApprovedReservation({

        nic,
        name,
        phonenumber,
        hall,
        pack,
        date,
        hallPackagePri,
        
    })

    newReservation.save().then(()=>{

        res.json("Pending Reservation Added")
    }).catch((err)=>{

        console.log(err);
    })
        
})


router.route("/").get((req,res)=>{

    ApprovedReservation.find().then((reservations)=>{

        res.json(reservations)

    }).catch((err)=>{

        console.log(err)
    })
})


router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const reservation = await Package.findById(userId)
    .then((reservation)=> {
        res.status(200).send({status: "Reservation fetched", reservation}); 
    })
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with item"});
    })
})


router.route("/update/:nic").put(async(req,res)=>{

    let reservationId = req.params.nic;
    
    const nic = req.body.nic;
    const name = req.body.name;
    const phonenumber = Number(req.body.phonenumber);
    const hall = req.body.hall;
    const pack = req.body.pack;
    const date = req.body.date;

    const updateReservation = {

        nic,
        name,
        phonenumber,
        hall,
        pack,
        date,

    }

    const update = await ApprovedReservation.findOneAndUpdate(reservationId,updateReservation)
    .then(()=>{

    res.status(200).send({status:"Reservation updated"})

    }).catch((err)=>{

        res.status(500).send({status:"Error with updating data",error :err.message});

    })
})

router.route("/delete/:id").delete(async(req,res)=>{

    let reservationId =req.params.id;
    await ApprovedReservation.findByIdAndDelete(reservationId)
    .then(()=>{

        res.status(200).send({status: "Reservation Deleted"});

    }).catch((err)=>{

        console.log(err.message);
        res.status(500).send({status:"Error with Delete Reservation", error:err.message});
    })
})



module.exports= router;