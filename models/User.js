const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    age: Number,
    height: Number,
    weight: Number,
    goal: String,
    waterIntake: {
        type: Number,
        default: 0
    },
    waterGoal: {
        type: Number,
        default: 3
    },
    waterIntakeDate: Date,
    workouts: {
        type: Number,
        default: 0
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

module.exports =
    mongoose.models.User ||
    mongoose.model("User", userSchema);