//This model works as a blueprint

//to connect with mongoDB, import the mongoose package
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//creating an object from the above schema
const deliverySchema = new Schema({
    //defining the attributes
    cusName : {
        type : String,
        required : true
    },
    cusContact : {
        type : Number,
        required : true
    },
    delAddress : {
        type : String,
        required : true
    },
    delRider : {
        type : String,
    }
})

//sending data of the above schema to the database
const Delivery = mongoose.model("Delivery", deliverySchema);

//export the module (This is mandatory)
module.exports = Delivery;