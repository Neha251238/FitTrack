require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/user");

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {

        const email = "kumarineha87439@gmail.com";

        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            process.exit();
        }

        user.role = "admin";
        await user.save();

        console.log("User is now ADMIN");

        process.exit();
    })
    .catch(error => {
        console.log(error);
    });