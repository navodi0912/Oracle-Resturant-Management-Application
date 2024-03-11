const router = require("express").Router();
let Menu = require("../models/Menu.js");

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const ingredients = req.body.ingredients;
    const portionSize = Number(req.body.portionSize);
    const price = Number(req.body.price);
    const category = req.body.category;
    // const image = req.body.image;


    // check whether an image was uploaded
    if(!req.files || !req.files.image){
        return res.status(400).json({ message: 'No image was uploaded.' });
    }
    else{
        // the file is stored into a variable
        const imageFile = req.files.image;
        
        //the name of the image is stored here
        const image = imageFile.name;

        imageFile.mv(`public/images/${image}`, err => {
            if (err) {
               console.error("Image upload error: " + err);
               return res.status(500).send(err);
            }
         });

        const menuItem = new Menu({
            name,
            ingredients,
            portionSize,
            price,
            category,
            image
        })

        menuItem.save().then(() => {
            res.json({status: "Product added successfully!"});
        }).catch((err) => {
            console.log(err);
        });
    } // end of else

    
})

router.route("/").get((req, res) => {
    Menu.find().then((menuItems)=>{
        res.json(menuItems);
    }).catch((err) => {
        console.log(err);
    })
})


// http://localhost:8070/menu/update/:id
router.route("/updateMenu/:id").put(async (req, res) => {
    let userId = req.params.id;
    const {name,ingredients,portionSize,price,category} = req.body;

    const updateItem = {
        name,
        ingredients,
        portionSize,
        price,
        category
    }

    const update = await Menu.findByIdAndUpdate(userId, updateItem).then(() => {
        res.status(200).send({status: "Item updated"});
    }).catch((err) => {
        console.log(err);
    });

    // try {
    //     const updatedItem = await Menu.findByIdAndUpdate(userId, updateItem, { new: true });
    //     console.log(updatedItem);
    //     res.status(200).send({status: "User updated"});
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).send({status: "Error with updating user"});
    // }
})

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Menu.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "User deleted"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with deleting user"});
    });
})

router.route("/getItem/:id").get(async (req, res) => {
    let userId = req.params.id;
    const item = await Menu.findById(userId)
    .then((item)=> {
        res.status(200).send({status: "Item fetched", item}); // As the item is passed with the response, we need to pass the item as a parameter to then()
    })
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with item"});
    })
})

module.exports = router;


