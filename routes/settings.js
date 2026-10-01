const express = require("express");
const router = express.Router();

const User = require("../models/User");
const auth = require("../middleware/auth");

// ================= SETTINGS PAGE =================

router.get("/settings", auth, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.redirect("/login");
        }

        res.render("settings", { user });

    } catch (error) {
        console.error("Settings Error:", error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;