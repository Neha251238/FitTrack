const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

// Show Profile
router.get("/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.redirect("/login");
        }

        res.render("profile", { user });

    } catch (error) {
        console.log(error);
        res.status(500).send("Profile Error");
    }
});

// Update Profile
router.post("/profile/update", auth, async (req, res) => {
    try {
        const { name, age, height, weight, goal } = req.body;

        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.redirect("/login");
        }

        user.name = name;
        user.age = age;
        user.height = height;
        user.weight = weight;
        user.goal = goal;

        await user.save();

        res.redirect("/profile");

    } catch (error) {
        console.log(error);
        res.status(500).send("Profile Update Error");
    }
});

module.exports = router;