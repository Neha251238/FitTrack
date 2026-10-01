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

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
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