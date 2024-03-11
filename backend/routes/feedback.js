const router = require("express").Router();
let Feedback = require("../models/Feedback");


router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const number = Number(req.body.number);
    const feedback = req.body.feedback;

    const newFeedback = new Feedback({
        name,
        email,
        number,
        feedback
    })

    newFeedback.save().then(()=>{
        res.json("Feedback added")
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/").get((req,res)=>{
    
    Feedback.find().then((feedback)=>{
        res.json(feedback)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/admin").get((req,res)=>{
    
    Feedback.find().then((feedback)=>{
        res.json(feedback)
    }).catch((err)=>{
        console.log(err)
    })
})
    

router.route("/update/:id").put(async (req,res) => {
    let userId = req.params.id;
    const {name, email, number, feedback} = req.body;

    const updateFeedback = {
        name,
        email,
        number,
        feedback
    }

    const update = await Feedback.findByIdAndUpdate(userId, updateFeedback).then(()=> {
        res.status(200).send({status: "user updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "error with updating data", error: err.message});
    })
}) 


router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await Feedback.findByIdAndDelete(userId).then(()=> {
        res.status(200).send({status: "user deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with delete user",error: err.message});
    })
})


router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;
    const user = await Feedback.findById(userId).then((feedback) => {
        res.status(200).send({status: "user fetched", feedback})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with get user",error: err.message});
    })
})

 module.exports = router;