require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./models/user");

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {

        console.log("MongoDB Connected");

        const email = "kumarineha87439@gmail.com";
        const newPassword = "123456";

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            process.exit();
        }

        user.password = hashedPassword;

        await user.save();

        console.log("Password changed successfully!");
        console.log("New Password:", newPassword);

        process.exit();

    })
    .catch(error => {
        console.log(error);
    });