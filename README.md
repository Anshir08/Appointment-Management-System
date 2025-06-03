# 🩺 Appointment Management System (AMS)

## 🛠 Tech Stack

### Frontend
- **React.js**
- **Material UI**
- **React Router**
- **Redux Toolkit**
- **Axios**
- **Day.js**

### Backend
- **Node.js (Express)**
- **bcrypt**
- **jsonwebtoken**
- **Mongoose (ORM)**
- **Nodemailer**
- **CORS**
- **cookie-parser**

### Database
- **MongoDB Atlas**

---

## 🚀 Project Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Frontend Setup

Open the first terminal:

```bash
cd AMS_Frontend
npm install
npm run dev
```

### 3. Backend Setup

Open the second terminal:

```bash
cd AMS_Backend
npm install
npm start
```

---

## 🧠 Project Approach

- Implemented authentication for **patients, doctors, and admins**.
- **Only patients** can self-register. **Doctors** must be created by **admins**.
- Doctors and Admins are allowed to log in directly.
- **Home** and **Book Appointment** pages are public so guests can view and book appointments.
- Appointment **date and time slots** are dynamically generated based on clinic working hours.
- Role-based routing implemented with **protected routes**.

---

## 🔐 Role-Based Access

### Admin-Only Routes:
- Admin Dashboard
- Create Doctor
- Create Appointment for Patient
- Update User

### Authenticated Users (All Roles):
- View Appointments

---

## 🐛 Issues Faced

- **State Management** across the app using Redux Toolkit took significant time.
- More **polish and optimization** is still possible to enhance scalability and UX.

---

## ⏳ Estimated Time to Complete

> ⏱ **Approx. 20 hours**

---

## ✅ Current Status

- All core requirements are implemented.
- Extra features like **guest appointment booking with email confirmation** have been added.
- Additional polish is still possible to make it **error-proof** and production-ready.

---

## 🔮 Pending Enhancements

- Improve UX with more detailed error handling.
- Add background job scheduler (e.g., **node-cron**) to:
  - Automatically cancel appointments missed by doctors or patients.
  - Send update emails or reminders proactively.

---

## 🧪 Sample Test Credentials

### 👤 Patient
- **Email**: `patient@example.com`  
- **Password**: `password`

### 🩺 Doctor
- **Email**: `doctor@example.com`  
- **Password**: `password`

### 🛡 Admin
- **Email**: `admin@example.com`  
- **Password**: `password`

> 💡 **Guest Users** can also try booking an appointment. They will receive a confirmation email with appointment details without needing to log in.

---

### 🙏 Thank you for your time!