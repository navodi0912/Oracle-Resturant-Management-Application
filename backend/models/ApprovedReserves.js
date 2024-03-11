const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const approvedReservationSchema = new Schema({


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

    hallPackagePri:{
        type: String,
        require:true
    }



})

const ApprovedReservation = mongoose.model("Approved_Reservation",approvedReservationSchema);

module.exports = ApprovedReservation;
