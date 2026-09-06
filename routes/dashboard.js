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


// Dashboard

router.get("/dashboard", auth, async (req, res) => {

    try {

        const user = await User.findById(req.session.userId);

        res.render("dashboard", {
            user
        });

    } catch (error) {

        console.log(error);
        res.send("Dashboard error");

    }

});


module.exports = router;