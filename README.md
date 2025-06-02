## Tech stack used, including specific libraries / versions.

Frontend - Reactjs, Material UI, React Router, Redux-toolkit, Axios, dayjs.
Backend - NodeJs(Express), bcrypt, jsonwebtoken, Mongoose(ORM), Nodemailer, cors, cookie-parser.
Database - MongoDB Atlas

## Project setup guidelines

clone the repository

Open first terminal
   - cd AMS_Frontend
   - npm install
   - npm run dev

Open second terminal
   - cd AMS_Backend
   - npm install
   - npm start


## A quick paragraph with how you approached the project, what you liked,
what you didn’t like, and where you faced issues.

# Approach - 

Made for Authentication for both patients, doctors and admins where only patient can register doctors would be created by admins only. Doctors and Admins are allowed to login.

Home Page and Book_Appointment(dynamic according to the role i.e. guest or other user) pages are public so that Guest can also access them

Date and time_slots are generated dynamically according to the working hours of the clinic.

Only Admin accessible routes -
    Admin Dashboard
    Create Doctor
    Create Appointment for Patient
    Update User

ViewAppointments route is only accessible by all authenticated users.

# Issues - 
State Managing the whole app took a lot of time still lot of polishng could be done just to make it scalable.

## Estimated time to complete your test.

Took me approx 20 hours

## What is pending by your side?

-- The Requirements have all covered plus some extra features have been added.

-- A lot of Polishing could be done more for make it all possible errors prone.

-- Also some extra features could have been added like automatic sending updates, cancelling of appointments that have been missed by doctor or if patient doesn't show up for the appointment via scheduling to run these kind of background concurrent tasks using node-cron package.


# Sample Data to test in an Isolated Environment

- Patient Account Credential- 
    email: "patient@example.com",
    password: "password",

- Doctor Account Credential- 
    email: "doctor@example.com",
    password: "password",

- Admin Account Credential- 
    email: "admin@example.com",
    password: "password",

- For Guest Try booking the appointment with any doctor without login. You will recieve the Confirmation Email with Appointment Details.



### Thank you for your time.