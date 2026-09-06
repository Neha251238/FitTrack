const express = require("express");
const router = express.Router();

const Trainer = require("../models/trainer");
const Booking = require("../models/booking");
const auth = require("../middleware/auth");


// Trainers page

router.get("/trainers", auth, async (req, res) => {

    try {

        const trainers = await Trainer.find();

        res.render("trainers", {
            trainers
        });

    } catch (error) {

        console.log(error);
        res.status(500).send("Trainer Error");

    }

});


// Booking page

router.get("/book-session/:id", auth, async (req, res) => {

    try {

        const trainer = await Trainer.findById(req.params.id);

        if (!trainer) {
            return res.status(404).send("Trainer not found");
        }

        res.render("book-session", {
            trainer
        });

    } catch (error) {

        console.log(error);
        res.status(500).send("Booking Page Error");

    }

});


// Create booking

router.post("/book-session/:id", auth, async (req, res) => {

    try {

        const { date, time } = req.body;

        await Booking.create({

            userId: req.session.userId,

            trainerId: req.params.id,

            date,

            time

        });

        res.redirect("/my-bookings");

    } catch (error) {

        console.log(error);
        res.status(500).send("Booking Error");

    }

});


// My bookings

router.get("/my-bookings", auth, async (req, res) => {

    try {

        const bookings = await Booking.find({
            userId: req.session.userId
        }).populate("trainerId");

        res.render("bookings", {
            bookings
        });

    } catch (error) {

        console.log(error);
        res.status(500).send("Bookings Error");

    }

});


module.exports = router;