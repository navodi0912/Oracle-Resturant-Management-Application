const router = require("express").Router();
let Employee = require("../models/Employee");

//create
//http://Localhost:8070/Employee/add
router.route("/add").post((req,res) => {
    // const email = req.body.email;
    // const password = req.body.password;
    const name = req.body.name;
    const designation = req.body.designation;
    const address = req.body.address;
    const gender = req.body.gender;
    const phone = Number (req.body.phone);
    const salary = req.body.salary;

    const newEmployee = new Employee({
        // email,
        // password,
        name,
        designation,
        address,
        gender,
        phone,
        salary,
    })

    newEmployee.save().then(()=>{
        res.json("Employee added")
    }).catch((err)=>{
        console.log(err);
    })
})

//view all
//http://Localhost:8070/Employee
router.route("/").get((req,res)=>{
    Employee.find().then((employee)=>{
        res.json(employee)
    }).catch((eerr)=>{
        console.log(err)
    })
})

//update
//http://Localhost:8070/Employee/update
router.route("/update/:id").put(async (req,res) => {
    let userId = req.params.id;
    const { name, designation, address, gender, phone,salary,} = req.body;

    const updateEmployee = {
        // ç
        name,
        designation,
        address,
        gender,
        phone,
        salary,
    }

    const update = await Employee.findByIdAndUpdate(userId, updateEmployee)
    .then(() => {
        res.status(200).send({status: "user updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "error with updating", user: update});
    })

})

//delete
//http://Localhost:8070/Employee/delete
router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await Employee.findByIdAndDelete(userId).then (() => {
        res.status(200).send({status: "user deleted"});
    }).catch((err) => {
        console.log(err.meessage);
        res.status(500).send({status: "error with deleting", error: err.meessage});
    })
})

//view one
//http://Localhost:8070/Employee/get/id
router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
    await Employee.findById(userId)
    .then((employee) => {
        res.status(200).send({status: "user fetched", employee});
    }).catch((err) => {
        console.log(err.meessage);
        res.status(500).send({status: "error with deleting", error: err.meessage});
    }) 
})

module.exports = router;