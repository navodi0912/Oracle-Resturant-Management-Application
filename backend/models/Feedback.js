const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({

    name : {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true
    },
    feedback:{
        type: String,
        required: true
    }
})

const Feedback = mongoose.model("feedback",feedbackSchema);

module.exports = Feedback;