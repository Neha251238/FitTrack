const express = require("express");
const router = express.Router();
const Workout = require("../models/workout");
const User = require("../models/User");
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

router.post("/workouts/:id/complete", auth, async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({ error: "Workout not found" });
        }

        if (!workout.exercises || workout.exercises.length === 0) {
            return res.status(400).json({ error: "This workout has no exercises" });
        }

        const user = await User.findByIdAndUpdate(
            req.session.userId,
            { $inc: { workouts: 1 } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ workouts: user.workouts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to complete workout" });
    }
});

module.exports = router;