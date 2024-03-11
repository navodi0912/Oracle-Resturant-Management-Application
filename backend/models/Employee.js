const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    designation : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    gender : {
        type : String,
        required : true,
    },
    phone : {
        type : Number,
        required : true,
    },
    salary : {
        type : String,
        required : true,
    }
})

const Employee = mongoose.model("Employee",employeeSchema);

module.exports = Employee;