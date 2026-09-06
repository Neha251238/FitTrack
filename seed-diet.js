require("dotenv").config();

const mongoose = require("mongoose");
const Diet = require("./models/diet");

const diets = [

    {
        name: "Weight Loss Diet",
        category: "Weight Loss",
        calories: 1600,
        protein: 100,
        carbs: 180,
        fats: 50,

        breakfast: "Oats + Banana + Boiled Eggs",

        lunch: "Brown Rice + Dal + Salad",

        dinner: "Grilled Chicken + Vegetables",

        snacks: "Apple + Almonds"
    },

    {
        name: "Muscle Gain Diet",
        category: "Muscle Gain",
        calories: 2500,
        protein: 160,
        carbs: 300,
        fats: 80,

        breakfast: "Eggs + Oats + Banana + Milk",

        lunch: "Rice + Chicken + Vegetables",

        dinner: "Paneer + Roti + Salad",

        snacks: "Protein Shake + Peanut Butter"
    },

    {
        name: "General Fitness Diet",
        category: "General Fitness",
        calories: 2000,
        protein: 120,
        carbs: 240,
        fats: 65,

        breakfast: "Poha + Eggs + Fruits",

        lunch: "Roti + Dal + Vegetables + Curd",

        dinner: "Rice + Paneer + Salad",

        snacks: "Fruits + Nuts"
    },

    {
        name: "High Protein Diet",
        category: "High Protein",
        calories: 2200,
        protein: 150,
        carbs: 220,
        fats: 70,

        breakfast: "4 Eggs + Oats + Milk",

        lunch: "Chicken + Brown Rice + Salad",

        dinner: "Paneer + Roti + Vegetables",

        snacks: "Greek Yogurt + Almonds"
    }

];


async function seedDiet() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        await Diet.deleteMany({});

        await Diet.insertMany(diets);

        console.log("Diet data inserted successfully!");

        await mongoose.connection.close();

    } catch (error) {

        console.log("Error:", error);

    }

}


seedDiet();