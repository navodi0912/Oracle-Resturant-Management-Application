const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({

    CustomerName : {
        type : String,
        required : true
    },
    ContactNo : {
        type : Number,
        required : true
    },
    Address : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        require : true
    },
    FullName : {
        type : String,
        required : true
    }
})

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;