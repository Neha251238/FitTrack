const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");


// =======================
// REGISTER PAGE
// =======================

router.get("/register", (req, res) => {
    res.render("register");
});


// =======================
// REGISTER USER
// =======================

router.post("/register", async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            age,
            height,
            weight,
            goal
        } = req.body;


        // Check existing email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send("Email already registered");
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create new user
        const user = new User({

            name: name,

            email: email,

            password: hashedPassword,

            age: age,

            height: height,

            weight: weight,

            goal: goal

        });


        // Save user
        await user.save();


        console.log("User registered successfully");

        res.redirect("/login");


    } catch (error) {

        console.log("Registration Error:", error);

        res.status(500).send("Registration Error");

    }

});


// =======================
// LOGIN PAGE
// =======================

router.get("/login", (req, res) => {

    res.render("login");

});


// =======================
// LOGIN USER
// =======================

router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // Find user
        const user = await User.findOne({ email });


        if (!user) {

            return res.send("Invalid email or password");

        }


        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!isMatch) {

            return res.send("Invalid email or password");

        }


        // Create session
        req.session.userId = user._id;

        req.session.role = user.role;


        // Admin redirect
        if (user.role === "admin") {

            return res.redirect("/admin/dashboard");

        }


        // Normal user redirect
        res.redirect("/dashboard");


    } catch (error) {

        console.log("Login Error:", error);

        res.status(500).send("Login Error");

    }

});


// =======================
// LOGOUT
// =======================

router.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.redirect("/login");

    });

});


module.exports = router;