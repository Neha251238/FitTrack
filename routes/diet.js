const express = require("express");
const router = express.Router();

const Diet = require("../models/diet");
const auth = require("../middleware/auth");

// All Diet Plans
router.get("/diets", auth, async (req, res) => {
    try {
        const diets = await Diet.find();

        res.render("diets", { diets });

    } catch (error) {
        console.log(error);
        res.status(500).send("Diet Error");
    }
});


// Diet Details
router.get("/diets/:id", auth, async (req, res) => {
    try {
        const diet = await Diet.findById(req.params.id);

        if (!diet) {
            return res.status(404).send("Diet not found");
        }

        res.render("diet-details", { diet });

    } catch (error) {
        console.log(error);
        res.status(500).send("Diet Details Error");
    }
});


module.exports = router;