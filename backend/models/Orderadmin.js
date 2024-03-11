const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderadminSchema = new Schema({
    total : {
        type : Number,
        required : true
    },
    timestamp: {
        type: Date,
        default: Date.now,
      },
})

const Orderadmin = mongoose.model("Orderadmin", orderadminSchema)

module.exports = Orderadmin;