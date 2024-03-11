const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const packageSchema = new Schema({


    packageid : {

        type: String,
        require :true,
        unique: true,
        

    },


    name : {

        type: String,
        require :true

    },


    items: {

        type: String,
        require :true

    },

    price : {

        type: Number,
        require :true

    },


    imageurls: [],



})

const Package = mongoose.model("Package",packageSchema);

module.exports = Package;