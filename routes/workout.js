const express = require("express");
const router = express.Router();
const Workout = require("../models/workout");
const auth = require("../middleware/auth");

// All workouts
router.get("/workouts", auth, async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.render("workouts", { workouts });
    } catch (error) {
        console.log(error);
        res.status(500).send("Workout Error");
    }
});

// Workout details
router.get("/workouts/:id", auth, async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).send("Workout not found");
        }

        res.render("workout-details", { workout });

    } catch (error) {
        console.log(error);
        res.status(500).send("Workout Details Error");
    }
});

module.exports = router;