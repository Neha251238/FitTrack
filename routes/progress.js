const express = require("express");
const router = express.Router();

const Progress = require("../models/progress");
const User = require("../models/user");
const auth = require("../middleware/auth");


// Progress page
router.get("/progress", auth, async (req, res) => {
    try {

        const user = await User.findById(req.session.userId);

        const progress = await Progress.find({
            userId: req.session.userId
        }).sort({ date: -1 });

        res.render("progress", {
            user,
            progress
        });

    } catch (error) {

        console.log(error);
        res.status(500).send("Progress Error");

    }
});


// Add progress
router.post("/progress/add", auth, async (req, res) => {
    try {

        const { weight, workouts, calories } = req.body;

        const user = await User.findById(req.session.userId);

        const heightMeter = user.height / 100;

        const bmi =
            weight / (heightMeter * heightMeter);

        await Progress.create({
            userId: req.session.userId,
            weight,
            bmi: bmi.toFixed(1),
            workouts,
            calories
        });

        res.redirect("/progress");

    } catch (error) {

        console.log(error);
        res.status(500).send("Progress Add Error");

    }
});


module.exports = router;