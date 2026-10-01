require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const profileRoutes = require("./routes/profile");
const workoutRoutes = require("./routes/workout");
const dietRoutes = require("./routes/diet");
const progressRoutes = require("./routes/progress");
const trainerRoutes = require("./routes/trainer");
const adminRoutes = require("./routes/admin");
const settingsRoutes = require("./routes/settings");
const Workout = require("./models/workout");

const DEFAULT_WORKOUTS = [
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

const DEFAULT_EXERCISES = {
    "full body": [
        { name: "Squats", sets: 3, reps: 12 },
        { name: "Push Ups", sets: 3, reps: 10 },
        { name: "Lunges", sets: 3, reps: 10 },
        { name: "Plank", sets: 3, reps: 30 }
    ],
    "upper body": [
        { name: "Bench Press", sets: 3, reps: 10 },
        { name: "Rows", sets: 3, reps: 12 },
        { name: "Shoulder Press", sets: 3, reps: 10 },
        { name: "Bicep Curls", sets: 3, reps: 12 }
    ],
    "cardio": [
        { name: "Jumping Jacks", sets: 3, reps: 20 },
        { name: "Burpees", sets: 3, reps: 10 },
        { name: "Mountain Climbers", sets: 3, reps: 15 },
        { name: "High Knees", sets: 3, reps: 20 }
    ],
    "leg": [
        { name: "Squats", sets: 4, reps: 12 },
        { name: "Lunges", sets: 3, reps: 12 },
        { name: "Leg Press", sets: 3, reps: 10 },
        { name: "Calf Raises", sets: 3, reps: 15 }
    ],
    "hiit": [
        { name: "Burpees", sets: 4, reps: 15 },
        { name: "Mountain Climbers", sets: 4, reps: 20 },
        { name: "Jump Squats", sets: 4, reps: 15 },
        { name: "High Knees", sets: 4, reps: 20 }
    ],
    "core": [
        { name: "Plank", sets: 3, reps: 30 },
        { name: "Russian Twists", sets: 3, reps: 20 },
        { name: "Dead Bug", sets: 3, reps: 12 },
        { name: "Bicycle Crunches", sets: 3, reps: 15 }
    ]
};

const app = express();

// =======================
// PORT
// =======================

const PORT = process.env.PORT || 3000;

// =======================
// VIEW ENGINE
// =======================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// =======================
// STATIC FILES
// =======================

app.use(express.static(path.join(__dirname, "public")));

// =======================
// MIDDLEWARE
// =======================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    const routeStyles = [
        [/^\/(login|register)$/, ["auth.css"]],
        [/^\/admin(?:\/|$)/, ["admin.css", "style.css"]],
        [/^\/dashboard$/, ["dashboard.css", "style.css"]],
        [/^\/profile$/, ["profile.css", "style.css"]],
        [/^\/workouts$/, ["workout.css", "style.css"]],
        [/^\/workouts\/[^/]+$/, ["workout-details.css", "style.css"]],
        [/^\/diets$/, ["diet.css", "style.css"]],
        [/^\/diets\/[^/]+$/, ["diet-details.css", "style.css"]],
        [/^\/trainers$/, ["trainers.css", "style.css"]],
        [/^\/book-session\/[^/]+$/, ["book-session.css", "style.css"]],
        [/^\/my-bookings$/, ["bookings.css", "style.css"]],
        [/^\/progress$/, ["progress.css", "style.css"]],
        [/^\/settings$/, ["settings.css", "style.css"]]
    ];

    res.locals.stylesheets =
        routeStyles.find(([pattern]) => pattern.test(req.path))?.[1] || ["style.css"];
    res.locals.currentPath = req.path;

    next();
});

// =======================
// SESSION
// =======================

app.use(
    session({
        secret: process.env.SESSION_SECRET || "fittracksecret",
        resave: false,
        saveUninitialized: false,

        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

// =======================
// MONGODB CONNECTION
// =======================

async function seedDefaultWorkouts() {
    try {
        const existingWorkouts = await Workout.find();

        if (existingWorkouts.length === 0) {
            await Workout.insertMany(DEFAULT_WORKOUTS);
            console.log("Default workout data inserted");
            return;
        }

        let repaired = 0;

        for (const workout of existingWorkouts) {
            const name = (workout.name || "").toLowerCase();
            const fallbackExercises = Object.entries(DEFAULT_EXERCISES).find(([key]) => name.includes(key))?.[1] || [];
            const exercises = workout.exercises && workout.exercises.length > 0
                ? workout.exercises
                : fallbackExercises;

            if (workout.exercises?.length !== exercises.length || !workout.exercises || workout.exercises.length === 0) {
                await Workout.findByIdAndUpdate(workout._id, { exercises });
                repaired += 1;
            }
        }

        if (repaired > 0) {
            console.log(`Repaired ${repaired} workout(s) with missing exercise data`);
        }
    } catch (error) {
        console.error("Workout seed error:", error);
    }
}

mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected");
        await seedDefaultWorkouts();
    })
    .catch((err) => {
        console.log("MongoDB Connection Error:", err);
    });

// =======================
// ROUTES
// =======================

app.use("/", authRoutes);
app.use("/", dashboardRoutes);
app.use("/", profileRoutes);
app.use("/", workoutRoutes);
app.use("/", dietRoutes);
app.use("/", progressRoutes);
app.use("/", trainerRoutes);
app.use("/", adminRoutes);
app.use("/", settingsRoutes);
// =======================
// HOME ROUTE
// =======================

app.get("/", (req, res) => {
    res.redirect("/login");
});

// =======================
// 404 ROUTE
// =======================

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// =======================
// SERVER
// =======================

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});