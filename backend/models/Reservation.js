const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({


    nic : {

        type: String,
        require :true

    },


    name : {

        type: String,
        require :true

    },


    phonenumber: {

        type: Number,
        require :true

    },

    hall : {

        type: String,
        require :true

    },

    pack : {

        type: String,
        require :true

    },

    date : {

        type: String,
        require :true

    },

    hallPackagePri : {

        type: Number,
        require :true

    },


})

const Reservation = mongoose.model("Reservation",reservationSchema);

module.exports = Reservation;