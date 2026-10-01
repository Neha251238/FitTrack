require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./models/User");

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const newPassword = process.env.ADMIN_PASSWORD;

if (!email || !newPassword) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env before running this script.");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {

        console.log("MongoDB Connected");

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            process.exit();
        }

        user.password = hashedPassword;

        await user.save();

        console.log("Password changed successfully!");

        process.exit();

    })
    .catch(error => {
        console.log(error);
    });