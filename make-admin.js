require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./models/user");

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env before running this script.");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {

        console.log("MongoDB Connected");

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            existingUser.password = await bcrypt.hash(password, 10);
            existingUser.role = "admin";

            await existingUser.save();

            console.log("Existing user converted to ADMIN");
        } else {

            // Create new admin
            const hashedPassword = await bcrypt.hash(password, 10);

            const admin = new User({
                name: "Admin",
                email: email,
                password: hashedPassword,
                role: "admin"
            });

            await admin.save();

            console.log("New ADMIN created successfully");
        }

        console.log("Role: admin");

        process.exit();

    })
    .catch(error => {
        console.log("Error:", error);
        process.exit(1);
    });