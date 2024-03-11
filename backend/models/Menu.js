const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    ingredients : {
        type : String,
        required : true
    },
    portionSize: {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    image : String
})

const Menu = mongoose.model("Menu", menuSchema) // "Menu" is the name of the table - here the Menu will become menus by default

module.exports = Menu;