require("dotenv").config();

const mongoose = require("mongoose");
const Workout = require("./models/workout");

const workouts = [
    {
        name: "Full Body Workout",
        category: "Strength",
        level: "Beginner",
        duration: 30,
        exercises: [
            { name: "Squats", sets: 3, reps: 12 },
            { name: "Push Ups", sets: 3, reps: 10 },
            { name: "Lunges", sets: 3, reps: 10 },
            { name: "Plank", sets: 3, reps: 30 }
        ]
    },

    {
        name: "Chest & Triceps",
        category: "Strength",
        level: "Intermediate",
        duration: 45,
        exercises: [
            { name: "Bench Press", sets: 3, reps: 10 },
            { name: "Push Ups", sets: 3, reps: 12 },
            { name: "Chest Fly", sets: 3, reps: 10 },
            { name: "Triceps Dips", sets: 3, reps: 10 }
        ]
    },

    {
        name: "Leg Workout",
        category: "Legs",
        level: "Intermediate",
        duration: 40,
        exercises: [
            { name: "Squats", sets: 4, reps: 12 },
            { name: "Lunges", sets: 3, reps: 12 },
            { name: "Leg Press", sets: 3, reps: 10 },
            { name: "Calf Raises", sets: 3, reps: 15 }
        ]
    },

    {
        name: "Cardio Workout",
        category: "Cardio",
        level: "Beginner",
        duration: 25,
        exercises: [
            { name: "Jumping Jacks", sets: 3, reps: 20 },
            { name: "High Knees", sets: 3, reps: 20 },
            { name: "Mountain Climbers", sets: 3, reps: 15 },
            { name: "Burpees", sets: 3, reps: 10 }
        ]
    },

    {
        name: "Advanced HIIT",
        category: "HIIT",
        level: "Advanced",
        duration: 35,
        exercises: [
            { name: "Burpees", sets: 4, reps: 15 },
            { name: "Mountain Climbers", sets: 4, reps: 20 },
            { name: "Jump Squats", sets: 4, reps: 15 },
            { name: "High Knees", sets: 4, reps: 20 }
        ]
    }
];

async function seedDB() {
    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        await Workout.deleteMany({});

        await Workout.insertMany(workouts);

        console.log("Workout data inserted successfully!");

        await mongoose.connection.close();

    } catch (error) {

        console.log("Error:", error);

    }
}

seedDB();