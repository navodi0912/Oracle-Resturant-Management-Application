const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderstaffSchema = new Schema({
    products: {
        type: Map,
        of: Number
      }
})

const Orderstaff = mongoose.model("Orderstaff", orderstaffSchema)

module.exports = Orderstaff;