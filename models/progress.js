const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    bmi: {
        type: Number
    },

    workouts: {
        type: Number,
        default: 0
    },

    calories: {
        type: Number,
        default: 0
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports =
    mongoose.models.Progress ||
    mongoose.model("Progress", progressSchema);