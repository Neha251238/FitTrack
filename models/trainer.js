const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    specialization: {
        type: String,
        required: true
    },

    experience: {
        type: Number,
        required: true
    },

    availability: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: ""
    }
});

module.exports =
    mongoose.models.Trainer ||
    mongoose.model("Trainer", trainerSchema);