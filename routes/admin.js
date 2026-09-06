const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Trainer = require("../models/trainer");
const Workout = require("../models/workout");
const Diet = require("../models/diet");
const Booking = require("../models/booking");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/admin/dashboard", auth, admin, async (req, res) => {
    try {
        const users = await User.countDocuments();
        const trainers = await Trainer.countDocuments();
        const workouts = await Workout.countDocuments();
        const diets = await Diet.countDocuments();
        const bookings = await Booking.countDocuments();

        res.render("admin-dashboard", {
            users,
            trainers,
            workouts,
            diets,
            bookings
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Admin Dashboard Error");
    }
});

// ================= TRAINER MANAGEMENT =================

// View all trainers
router.get("/admin/trainers", auth, admin, async (req, res) => {
    try {
        const trainers = await Trainer.find().sort({ _id: -1 });

        res.render("admin-trainers", {
            trainers
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Trainer Management Error");
    }
});


// Add trainer page
router.get("/admin/trainers/add", auth, admin, (req, res) => {
    res.render("admin-add-trainer");
});


// Add trainer
router.post("/admin/trainers/add", auth, admin, async (req, res) => {
    try {
        const {
            name,
            specialization,
            experience,
            availability
        } = req.body;

        await Trainer.create({
            name,
            specialization,
            experience,
            availability
        });

        res.redirect("/admin/trainers");

    } catch (error) {
        console.log(error);
        res.status(500).send("Add Trainer Error");
    }
});


// Delete trainer
router.post("/admin/trainers/delete/:id", auth, admin, async (req, res) => {
    try {
        await Trainer.findByIdAndDelete(req.params.id);

        res.redirect("/admin/trainers");

    } catch (error) {
        console.log(error);
        res.status(500).send("Delete Trainer Error");
    }
});

// ================= WORKOUT MANAGEMENT =================

// View all workouts
router.get("/admin/workouts", auth, admin, async (req, res) => {
    try {
        const workouts = await Workout.find().sort({ _id: -1 });

        res.render("admin-workouts", {
            workouts
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Workout Management Error");
    }
});


// Add workout page
router.get("/admin/workouts/add", auth, admin, (req, res) => {
    res.render("admin-add-workout");
});


// Add workout
router.post("/admin/workouts/add", auth, admin, async (req, res) => {
    try {
        const {
            name,
            category,
            level,
            duration
        } = req.body;

        await Workout.create({
            name,
            category,
            level,
            duration,
            exercises: []
        });

        res.redirect("/admin/workouts");

    } catch (error) {
        console.log(error);
        res.status(500).send("Add Workout Error");
    }
});


// Delete workout
router.post("/admin/workouts/delete/:id", auth, admin, async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.id);

        res.redirect("/admin/workouts");

    } catch (error) {
        console.log(error);
        res.status(500).send("Delete Workout Error");
    }
});

// ================= DIET MANAGEMENT =================

// View all diets
router.get("/admin/diets", auth, admin, async (req, res) => {
    try {
        const diets = await Diet.find().sort({ _id: -1 });

        res.render("admin-diets", {
            diets
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Diet Management Error");
    }
});


// Add diet page
router.get("/admin/diets/add", auth, admin, (req, res) => {
    res.render("admin-add-diet");
});


// Add diet
router.post("/admin/diets/add", auth, admin, async (req, res) => {
    try {
        const {
            name,
            category,
            calories,
            protein,
            carbs,
            fats,
            breakfast,
            lunch,
            dinner,
            snacks
        } = req.body;

        await Diet.create({
            name,
            category,
            calories,
            protein,
            carbs,
            fats,
            breakfast,
            lunch,
            dinner,
            snacks
        });

        res.redirect("/admin/diets");

    } catch (error) {
        console.log(error);
        res.status(500).send("Add Diet Error");
    }
});


// Delete diet
router.post("/admin/diets/delete/:id", auth, admin, async (req, res) => {
    try {
        await Diet.findByIdAndDelete(req.params.id);

        res.redirect("/admin/diets");

    } catch (error) {
        console.log(error);
        res.status(500).send("Delete Diet Error");
    }
});

// ================= BOOKING MANAGEMENT =================

// View all bookings
router.get("/admin/bookings", auth, admin, async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("userId")
            .populate("trainerId")
            .sort({ createdAt: -1 });

        res.render("admin-bookings", {
            bookings
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Booking Management Error");
    }
});


// Update booking status
router.post("/admin/bookings/status/:id", auth, admin, async (req, res) => {
    try {
        const { status } = req.body;

        await Booking.findByIdAndUpdate(
            req.params.id,
            { status }
        );

        res.redirect("/admin/bookings");

    } catch (error) {
        console.log(error);
        res.status(500).send("Update Booking Error");
    }
});


// Delete booking
router.post("/admin/bookings/delete/:id", auth, admin, async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);

        res.redirect("/admin/bookings");

    } catch (error) {
        console.log(error);
        res.status(500).send("Delete Booking Error");
    }
});

// EDIT TRAINER
router.get("/admin/trainers/edit/:id", auth, admin, async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);

        if (!trainer) {
            return res.status(404).send("Trainer not found");
        }

        res.render("admin-edit-trainer", { trainer });

    } catch (error) {
        console.log(error);
        res.status(500).send("Edit Trainer Error");
    }
});


// UPDATE TRAINER
router.post("/admin/trainers/edit/:id", auth, admin, async (req, res) => {
    try {
        const {
            name,
            specialization,
            experience,
            availability
        } = req.body;

        await Trainer.findByIdAndUpdate(
            req.params.id,
            {
                name,
                specialization,
                experience,
                availability
            }
        );

        res.redirect("/admin/trainers");

    } catch (error) {
        console.log(error);
        res.status(500).send("Update Trainer Error");
    }
});

// EDIT WORKOUT
router.get("/admin/workouts/edit/:id", auth, admin, async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).send("Workout not found");
        }

        res.render("admin-edit-workout", { workout });

    } catch (error) {
        console.log(error);
        res.status(500).send("Edit Workout Error");
    }
});


// UPDATE WORKOUT
router.post("/admin/workouts/edit/:id", auth, admin, async (req, res) => {
    try {
        const {
            name,
            category,
            level,
            duration
        } = req.body;

        await Workout.findByIdAndUpdate(
            req.params.id,
            {
                name,
                category,
                level,
                duration
            }
        );

        res.redirect("/admin/workouts");

    } catch (error) {
        console.log(error);
        res.status(500).send("Update Workout Error");
    }
});

// EDIT DIET
router.get("/admin/diets/edit/:id", auth, admin, async (req, res) => {
    try {
        const diet = await Diet.findById(req.params.id);

        if (!diet) {
            return res.status(404).send("Diet not found");
        }

        res.render("admin-edit-diet", { diet });

    } catch (error) {
        console.log(error);
        res.status(500).send("Edit Diet Error");
    }
});


// UPDATE DIET
router.post("/admin/diets/edit/:id", auth, admin, async (req, res) => {
    try {
        const {
            name,
            category,
            calories,
            protein,
            carbs,
            fats,
            breakfast,
            lunch,
            dinner,
            snacks
        } = req.body;

        await Diet.findByIdAndUpdate(
            req.params.id,
            {
                name,
                category,
                calories,
                protein,
                carbs,
                fats,
                breakfast,
                lunch,
                dinner,
                snacks
            }
        );

        res.redirect("/admin/diets");

    } catch (error) {
        console.log(error);
        res.status(500).send("Update Diet Error");
    }
});


module.exports = router;

// View all users
router.get("/admin/users", auth, admin, async (req, res) => {
    try {
        const users = await User.find().sort({ _id: -1 });

        res.render("admin-users", {
            users
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Users Error");
    }
});


// Delete user
router.post("/admin/users/delete/:id", auth, admin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.redirect("/admin/users");

    } catch (error) {
        console.log(error);
        res.status(500).send("Delete User Error");
    }
});


module.exports = router;