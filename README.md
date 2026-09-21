# 🩺 Doctor Appointment System

A full-stack web application I built to make the doctor appointment process simpler and more organized.

Instead of handling appointments manually, the application provides a digital way to explore doctors and manage appointment-related information through a clean and easy-to-use interface.

---

## 🌐 What is this project?

The **Doctor Appointment System** is one of my full-stack projects where I worked on both the frontend and backend of the application.

The main idea was simple:

> **Make booking and managing a doctor appointment easier through a web application.**

While building it, I worked with React for the user interface, Node.js and Express.js for the backend, and MongoDB for storing application data.

---

## 🧑‍⚕️ What can you do with it?

The application is designed around the complete appointment flow.

### For patients/users

* Browse doctors
* Check doctor-related information
* Select a doctor
* Enter appointment details
* Submit an appointment request
* View appointment-related information

### Behind the scenes

The application handles the communication between the frontend and backend and stores the required information in MongoDB.

So the basic flow looks like:

```text
User
 ↓
Select Doctor
 ↓
Enter Appointment Details
 ↓
React Frontend
 ↓
Express / Node.js API
 ↓
MongoDB
 ↓
Appointment Data
```

---

## 🛠️ Technologies I Used

| Area                 | Technology             |
| -------------------- | ---------------------- |
| Frontend             | React.js               |
| Programming Language | JavaScript             |
| UI                   | HTML5, CSS3, Bootstrap |
| Backend              | Node.js                |
| Server               | Express.js             |
| Database             | MongoDB                |
| Package Manager      | npm                    |
| Version Control      | Git & GitHub           |

---

## 💻 Some of the things I implemented

While developing this project, I worked with:

* React components
* State and event handling
* Forms and user input
* API requests
* Async/Await
* Express routes
* Backend API handling
* MongoDB data storage
* CRUD operations
* Frontend-backend integration
* Error handling
* Responsive UI

This project was particularly useful for understanding how different parts of a full-stack application communicate with each other.

---

## 🗂️ Project Structure

```text
Doctor-Appointment/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── .env
└── README.md
```

> Folder names can be slightly different depending on the current version of the project.

---

## ⚙️ Getting Started

Want to run the project locally?

### Clone it

```bash
git clone https://github.com/YOUR-USERNAME/Doctor-Appointment.git
```

Move into the project:

```bash
cd Doctor-Appointment
```

### Install frontend dependencies

```bash
cd frontend
npm install
```

### Install backend dependencies

```bash
cd ../backend
npm install
```

---

## 🔐 Environment Setup

The backend requires environment variables for the database connection.

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Keep your actual credentials private.

The `.env` file should not be pushed to GitHub.

---

## ▶️ Run Locally

Start the backend:

```bash
cd backend
npm run dev
```

Then open another terminal and start the frontend:

```bash
cd frontend
npm run dev
```

Open the local URL shown by Vite in your browser.

---

## 📸 Project Screenshots

### Home Page

Add your screenshot here:

```markdown
![Home Page](./screenshots/home.png)
```

### Doctors

```markdown
![Doctors](./screenshots/doctors.png)
```

### Appointment

```markdown
![Appointment](./screenshots/appointment.png)
```

---

## 🧩 How the frontend and backend communicate

One of the important parts of this project was connecting the React frontend with the backend.

For example:

```text
React Component
      │
      │ API Request
      ▼
Express Route
      │
      ▼
Controller
      │
      ▼
MongoDB
      │
      ▼
Response
      │
      ▼
React UI
```

This helped me understand that a full-stack application isn't just about designing the frontend — the frontend, APIs, server and database all need to work together.

---

## 📚 What I learned from this project

This project helped me move from simply learning individual technologies to actually using them together.

Some of the major things I learned were:

* How React applications are structured
* How to create reusable components
* How frontend applications communicate with APIs
* How Express handles backend requests
* How MongoDB stores application data
* How to work with asynchronous JavaScript
* How to connect frontend and backend
* How to debug issues across different parts of an application
* How to organize a full-stack project

---

## 🔭 Things I would like to add

There are several features that can be added as the project grows:

* 🔐 Login and registration
* 👤 Separate patient and doctor accounts
* 🩺 Doctor dashboard
* 🕐 Available appointment time slots
* 📅 Calendar-based booking
* 📧 Email appointment confirmation
* 🔔 Appointment reminders
* 💳 Online payment
* ⭐ Doctor reviews and ratings
* 🛠️ Admin dashboard
* 📊 Appointment statistics

---

## 👩‍💻 About Me

Hi, I'm **Stuti Dwivedi**.

I'm an MCA student interested in **Full Stack Development**, especially the **MERN stack**. I enjoy building projects that help me understand how real applications work rather than learning technologies only theoretically.

Currently, I'm improving my skills in:

```text
JavaScript
React.js
Node.js
Express.js
MongoDB
Java
DSA
```

### Find me here

**LinkedIn**
https://www.linkedin.com/in/stuti-eng

**GitHub**
https://github.com/Stuti-Dwivedi

**LeetCode**
https://leetcode.com/u/Stuti-D/

---

## ⭐ If you like the project

If this project helped you understand full-stack development or you simply found it interesting, feel free to leave a ⭐ on the repository.

Thanks for checking it out! ❤️
