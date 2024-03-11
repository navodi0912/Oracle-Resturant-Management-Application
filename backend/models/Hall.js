const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HallSchema = new Schema({


    name : {

        type: String,
        require :true

    },


    rentperday : {

        type: String,
        require :true

    },

    facility : {

        type: String,
        require :true

    },

    description : {

        type: String,
        require :true

    },

   imageurls:[],
   currentbooking:[],


})

const Hall = mongoose.model("Hall",HallSchema);

module.exports = Hall;