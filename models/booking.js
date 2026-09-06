const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainer",
        required: true
    },

    date: {
        type: String,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Booked"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports =
    mongoose.models.Booking ||
    mongoose.model("Booking", bookingSchema);