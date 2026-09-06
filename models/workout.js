const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    exercises: [
        {
            name: String,
            sets: Number,
            reps: Number
        }
    ]
});

module.exports =
    mongoose.models.Workout ||
    mongoose.model("Workout", workoutSchema);