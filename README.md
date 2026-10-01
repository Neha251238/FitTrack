# FitTrack

FitTrack is a fitness management web application for members and administrators. Members can browse workouts and diet plans, book trainer sessions, track progress, and record daily water intake. Administrators manage users, trainers, workouts, diets, and bookings.

## Features

### Member

- Register, log in, and log out.
- View a personal dashboard with BMI, weight, workout, calorie, and hydration summaries.
- Add water in 250 ml increments; daily intake resets on the next UTC day.
- Browse workout plans, check off exercises during a session, and save completed workouts.
- Browse diet plans and view nutrition summaries and meal plans.
- Browse trainers and book sessions by date and time.
- View bookings, update profile information, and record weight, workout, and calorie progress.
- View account settings and notification preferences.

### Administrator

- View administrative summaries and manage users.
- Add, edit, and delete trainers, workout plans, and diet plans.
- Review bookings, update booking status, and delete bookings.

Admin routes require an authenticated session with the `admin` role. Member routes require login.

## Requirements

- Node.js 18 or later
- MongoDB database
- npm

## Setup

1. Install dependencies:

    ```sh
    npm install
    ```

2. Create a local environment file from the example. In PowerShell:

    ```powershell
    Copy-Item .env.example .env
    ```

3. Set the values in `.env`:

    ```dotenv
    MONGO_URI=your_mongodb_connection_string
    SESSION_SECRET=replace_with_a_long_random_secret
    ADMIN_EMAIL=your_admin_email
    ADMIN_PASSWORD=use_a_unique_strong_password
    PORT=3000
    ```

    `.env` is ignored by Git. Do not commit real credentials. `PORT` is optional and defaults to `3000`.

4. Create or promote the administrator account:

    ```sh
    node make-admin.js
    ```

    The script reads `ADMIN_EMAIL` and `ADMIN_PASSWORD`, hashes the password with bcrypt, then creates the account or promotes the matching account to admin. To reset that account's password, update `ADMIN_PASSWORD` in `.env` and run:

    ```sh
    node reset-password.js
    ```

5. Start the application:

    ```sh
    npm start
    ```

    Open `http://localhost:3000`. For automatic restarts during development, use `npm run dev`.

## Sample Data

Optional sample data scripts:

```sh
node seed.js
node seed-diet.js
node seed-trainers.js
```

Each script deletes all existing documents from its corresponding collection (`Workout`, `Diet`, or `Trainer`) before inserting sample records. Back up data and run these only against a development database.

## Routes

### Public

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/` | Redirects to login |
| GET, POST | `/register` | Create a member account |
| GET, POST | `/login` | Sign in |
| GET | `/logout` | End the session |

### Member (login required)

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/dashboard` | Member dashboard |
| POST | `/water/add` | Add 250 ml to today's water intake |
| GET | `/profile` | View profile |
| POST | `/profile/update` | Update profile |
| GET | `/workouts` | Browse workout plans |
| GET | `/workouts/:id` | Start/view a workout session |
| POST | `/workouts/:id/complete` | Save a completed workout |
| GET | `/diets` | Browse diet plans |
| GET | `/diets/:id` | View diet plan details |
| GET | `/trainers` | Browse trainers |
| GET, POST | `/book-session/:id` | View or create a trainer booking |
| GET | `/my-bookings` | View member bookings |
| GET | `/progress` | View fitness progress |
| POST | `/progress/add` | Add a progress record |
| GET | `/settings` | View account settings |

### Administrator (admin role required)

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/admin/dashboard` | Admin dashboard |
| GET | `/admin/users` | Manage members |
| POST | `/admin/users/delete/:id` | Delete a member |
| GET | `/admin/trainers` | Manage trainers |
| GET, POST | `/admin/trainers/add` | Add a trainer |
| GET, POST | `/admin/trainers/edit/:id` | Edit a trainer |
| POST | `/admin/trainers/delete/:id` | Delete a trainer |
| GET | `/admin/workouts` | Manage workouts |
| GET, POST | `/admin/workouts/add` | Add a workout |
| GET, POST | `/admin/workouts/edit/:id` | Edit a workout |
| POST | `/admin/workouts/delete/:id` | Delete a workout |
| GET | `/admin/diets` | Manage diet plans |
| GET, POST | `/admin/diets/add` | Add a diet plan |
| GET, POST | `/admin/diets/edit/:id` | Edit a diet plan |
| POST | `/admin/diets/delete/:id` | Delete a diet plan |
| GET | `/admin/bookings` | Manage bookings |
| POST | `/admin/bookings/status/:id` | Update booking status |
| POST | `/admin/bookings/delete/:id` | Delete a booking |

## Project Structure

```text
FitTrack/
├── app.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── make-admin.js
├── reset-password.js
├── seed.js
├── seed-diet.js
├── seed-trainers.js
├── script.js
├── middleware/
│   ├── admin.js
│   └── auth.js
├── models/
│   ├── User.js
│   ├── booking.js
│   ├── diet.js
│   ├── progress.js
│   ├── trainer.js
│   └── workout.js
├── routes/
│   ├── admin.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── diet.js
│   ├── profile.js
│   ├── progress.js
│   ├── settings.js
│   ├── trainer.js
│   └── workout.js
├── views/
│   ├── admin-add-diet.ejs
│   ├── admin-add-trainer.ejs
│   ├── admin-add-workout.ejs
│   ├── admin-bookings.ejs
│   ├── admin-dashboard.ejs
│   ├── admin-diets.ejs
│   ├── admin-edit-diet.ejs
│   ├── admin-edit-trainer.ejs
│   ├── admin-trainers.ejs
│   ├── admin-users.ejs
│   ├── admin-workouts.ejs
│   ├── book-session.ejs
│   ├── bookings.ejs
│   ├── dashboard.ejs
│   ├── diet-details.ejs
│   ├── diets.ejs
│   ├── login.ejs
│   ├── profile.ejs
│   ├── progress.ejs
│   ├── register.ejs
│   ├── settings.ejs
│   ├── trainers.ejs
│   ├── workout-details.ejs
│   ├── workouts.ejs
│   └── partials/
│       ├── header.ejs
│       └── sidebar.ejs
└── public/
    └── css/
        ├── admin.css
        ├── auth.css
        ├── book-session.css
        ├── bookings.css
        ├── dashboard.css
        ├── diet.css
        ├── diet-details.css
        ├── profile.css
        ├── progress.css
        ├── settings.css
        ├── style.css
        ├── trainers.css
        ├── workout.css
        └── workout-details.css
```

## Technology

- Node.js and Express 5
- EJS templates, HTML, CSS, and browser JavaScript
- MongoDB with Mongoose
- `express-session` for login sessions
- `bcrypt` for password hashing
- Font Awesome and Google Fonts for icons and typography

## Known Limitations

- `/admin/workouts/edit/:id` currently renders `admin-edit-workout`, but `views/admin-edit-workout.ejs` is not present, so that edit page is incomplete.
- There is no configured automated test suite yet; `npm test` is currently a placeholder.