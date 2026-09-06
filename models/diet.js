const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    calories: {
        type: Number,
        required: true
    },

    protein: {
        type: Number,
        required: true
    },

    carbs: {
        type: Number,
        required: true
    },

    fats: {
        type: Number,
        required: true
    },

    breakfast: {
        type: String,
        required: true
    },

    lunch: {
        type: String,
        required: true
    },

    dinner: {
        type: String,
        required: true
    },

    snacks: {
        type: String,
        required: true
    }
});

module.exports =
    mongoose.models.Diet ||
    mongoose.model("Diet", dietSchema);