require("dotenv").config();

const mongoose = require("mongoose");
const Trainer = require("./models/trainer");

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {

        console.log("MongoDB Connected");

        await Trainer.deleteMany({});

        await Trainer.insertMany([

            {
                name: "Rahul Sharma",
                specialization: "Strength Training",
                experience: 5,
                availability: "9 AM - 1 PM"
            },

            {
                name: "Priya Singh",
                specialization: "Weight Loss",
                experience: 4,
                availability: "10 AM - 3 PM"
            },

            {
                name: "Aman Verma",
                specialization: "Muscle Building",
                experience: 7,
                availability: "4 PM - 8 PM"
            },

            {
                name: "Neha Kapoor",
                specialization: "Yoga & Fitness",
                experience: 6,
                availability: "7 AM - 11 AM"
            }

        ]);

        console.log("Trainers added successfully");

        process.exit();

    })
    .catch(error => {
        console.log(error);
    });