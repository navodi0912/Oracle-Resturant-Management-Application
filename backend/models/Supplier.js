const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({

    SupplierName:{
        type : String,
        require: true
    },
    ContactNo:{
        type : String,
        required: true
    },
    Address:{
        type : String,
        required: true
    },
    Email:{
        type : String,
        required: true
    },
    Products:{
        type : String,
        required: true
    }
   
})

const Supplier = mongoose.model("Supplier",supplierSchema);

module.exports = Supplier;