# 🏋️ FitTrack - Fitness Management System

FitTrack is a web-based Fitness Management System designed to help users manage their fitness activities, workout plans, diet plans, trainers, bookings, and progress.

The system provides separate features for users and administrators.

---

## 🚀 Features

### 👤 User Features

- User Registration
- User Login & Logout
- Secure Password Encryption
- User Profile Management
- BMI Calculation
- Workout Plans
- Diet Plans
- Trainer Listing
- Trainer Session Booking
- My Bookings
- Fitness Progress Tracking
- Weight Tracking
- Workout & Calorie Tracking
- Dashboard

### 👨‍💼 Admin Features

- Admin Login
- Admin Dashboard
- User Management
- Add / Edit / Delete Trainers
- Add / Edit / Delete Workout Plans
- Add / Edit / Delete Diet Plans
- Manage Bookings
- Update Booking Status
- View System Statistics

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- EJS
- Bootstrap

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication & Security

- bcrypt
- express-session

### Other Tools

- Git
- GitHub
- VS Code
- npm

---

## 📂 Project Structure

```text
fitness-management/
│
├── app.js
├── package.json
├── .env
├── .gitignore
│
├── middleware/
│   ├── auth.js
│   └── admin.js
│
├── models/
│   ├── user.js
│   ├── workout.js
│   ├── diet.js
│   ├── trainer.js
│   ├── booking.js
│   └── progress.js
│
├── routes/
│   ├── auth.js
│   ├── dashboard.js
│   ├── profile.js
│   ├── workout.js
│   ├── diet.js
│   ├── trainer.js
│   ├── progress.js
│   └── admin.js
│
├── views/
│   ├── login.ejs
│   ├── register.ejs
│   ├── dashboard.ejs
│   ├── profile.ejs
│   ├── workouts.ejs
│   ├── workout-details.ejs
│   ├── diets.ejs
│   ├── diet-details.ejs
│   ├── trainers.ejs
│   ├── book-session.ejs
│   ├── bookings.ejs
│   ├── progress.ejs
│   │
│   └── Admin Pages
│
└── public/
    ├── css/
    └── js/