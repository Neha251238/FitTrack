// const express = require("express");
// const router = express.Router();

// const User = require("../models/user");
// const auth = require("../middleware/auth");


// // Dashboard

// router.get("/dashboard", auth, async (req, res) => {

//     try {

//         const user = await User.findById(req.session.userId);

//         res.render("dashboard", {
//             user
//         });

//     } catch (error) {

//         console.log(error);
//         res.send("Dashboard error");

//     }

// });


// module.exports = router;

const express = require("express");
const router = express.Router();

const User = require("../models/user");
const auth = require("../middleware/auth");

function utcDayStart(date = new Date()) {
    const dayStart = new Date(date);
    dayStart.setUTCHours(0, 0, 0, 0);
    return dayStart;
}

async function resetWaterIntakeForToday(user) {
    const today = utcDayStart();

    if (!user.waterIntakeDate || user.waterIntakeDate < today) {
        user.waterIntake = 0;
        user.waterIntakeDate = today;
        await user.save();
    }
}


// Dashboard

router.get("/dashboard", auth, async (req, res) => {

    try {

        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.status(404).send("User Not Found");
        }

        await resetWaterIntakeForToday(user);

        res.render("dashboard", {
            user
        });

    } catch (error) {

        console.log(error);
        res.send("Dashboard error");

    }

});

router.post("/water/add", auth, async (req, res) => {
    try {
        const amount = Number(req.body.amount);

        if (![0.25, 0.5, 1].includes(amount)) {
            return res.status(400).json({ error: "Choose 250 ml, 500 ml, or 1 L" });
        }

        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await resetWaterIntakeForToday(user);

        user.waterGoal = Number(user.waterGoal) > 0 ? Number(user.waterGoal) : 3;
        user.waterIntake = Number((Number(user.waterIntake || 0) + amount).toFixed(2));
        await user.save();

        res.json({
            waterIntake: user.waterIntake,
            waterGoal: user.waterGoal
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to update water intake" });
    }
});


module.exports = router;