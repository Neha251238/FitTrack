// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");

// const authRoutes = require("./routes/auth");
// const dashboardRoutes = require("./routes/dashboard");

// const app = express();


// // ================= DATABASE =================

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log("MongoDB Connected");
//     })
//     .catch((error) => {
//         console.log("MongoDB Error:", error);
//     });


// // ================= EJS =================

// app.set("view engine", "ejs");


// // ================= MIDDLEWARE =================

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(express.static("public"));


// // ================= SESSION =================

// app.use(
//     session({
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: false,

//         store: MongoStore.create({
//             mongoUrl: process.env.MONGO_URI
//         }),

//         cookie: {
//             maxAge: 1000 * 60 * 60 * 24
//         }
//     })
// );


// // ================= ROUTES =================

// app.get("/", (req, res) => {
//     res.redirect("/login");
// });

// app.use("/", authRoutes);
// app.use("/", dashboardRoutes);


// // ================= SERVER =================

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
// const session = require("express-session");

// app.use(
//     session({
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: false,

//         cookie: {
//             maxAge: 1000 * 60 * 60 * 24
//         }
//     })
// );

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");


const app = express();
app.use(express.static(path.join(__dirname, "public")));

// =======================
// MongoDB Connection
// =======================

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("MongoDB Connection Error:", err);
    });

// =======================
// Middleware
// =======================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// =======================
// EJS
// =======================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// =======================
// Session
// =======================

app.use(
    session({
        secret: process.env.SESSION_SECRET || "fittracksecret",
        resave: false,
        saveUninitialized: false,

        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

// =======================
// Routes
// =======================

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const profileRoutes = require("./routes/profile");
const workoutRoutes = require("./routes/workout");
const dietRoutes = require("./routes/diet");
const progressRoutes = require("./routes/progress");
const trainerRoutes = require("./routes/trainer");
const adminRoutes = require("./routes/admin");



app.use("/", authRoutes);
app.use("/", dashboardRoutes);
app.use("/", profileRoutes);
app.use("/", workoutRoutes);
app.use("/", dietRoutes);
app.use("/", progressRoutes);
app.use("/", trainerRoutes);
app.use("/", adminRoutes);
// =======================
// Home Route
// =======================

app.get("/", (req, res) => {
    res.redirect("/login");
});

// =======================
// Server
// =======================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

