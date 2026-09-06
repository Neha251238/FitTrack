// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true
//         },

//         email: {
//             type: String,
//             required: true,
//             unique: true
//         },

//         password: {
//             type: String,
//             required: true
//         },

//         age: {
//             type: Number
//         },

//         height: {
//             type: Number
//         },

//         weight: {
//             type: Number
//         },

//         goal: {
//             type: String,
//             default: "General Fitness"
//         },

//         role: {
//             type: String,
//             default: "user"
//         }
//     },
//     {
//         timestamps: true
//     }
// );

// module.exports = mongoose.models.User || mongoose.model("User", userSchema);
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

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

module.exports =
    mongoose.models.User ||
    mongoose.model("User", userSchema);