function showWorkout() {
    alert("Opening Full Body Workout Plan...");
}

function openBMI() {
    let weight = prompt("Enter your weight in kg:");
    let height = prompt("Enter your height in meters:");

    if (weight && height) {
        let bmi = weight / (height * height);

        alert("Your BMI is: " + bmi.toFixed(2));
    }
}

function openWorkout() {
    alert("Workout Started! 💪");
}

function openDiet() {
    alert("Opening your Diet Plan 🥗");
}

function openTrainer() {
    alert("Finding available trainers...");
}