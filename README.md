# 📝 Task Manager Web Application

A full-stack Task Management application built with the **MERN Stack** (MongoDB, Express, React, Node.js) and **Firebase Authentication**. This application allows users to securely register, login, and manage their tasks with a modern Kanban-style dashboard.

---

## 🚀 Features

-   **Authentication**: Secure Login and Registration using Firebase.
-   **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
-   **Kanban Board**: Visualize tasks by status (To Do, In Progress, Completed).
-   **Dark Mode**: Fully supported dark/light theme toggle.
-   **Responsive Design**: Works on desktop and mobile devices.
-   **Tech Stack**: Built with modern technologies for performance and scalability.

---

## � Tech Stack

### **Frontend (Client)**
-   **React (Vite)**: Fast and modern frontend framework.
-   **Tailwind CSS (v4)**: Utility-first CSS framework for styling.
-   **Firebase SDK**: For client-side authentication.
-   **Axios**: For making HTTP requests to the backend.
-   **React Router**: For client-side routing.
-   **React Icons**: For beautiful UI icons.

### **Backend (Server)**
-   **Node.js & Express.js**: Robust backend runtime and framework.
-   **MongoDB & Mongoose**: NoSQL database for flexible data storage.
-   **Firebase Admin SDK**: For secure server-side token verification.
-   **Cors**: To handle Cross-Origin Resource Sharing.
-   **Dotenv**: For environment variable management.

---

## ⚙️ Prerequisites

Before running the project, make sure you have the following installed:

1.  **Node.js** (v18 or higher) - [Download Here](https://nodejs.org/)
2.  **MongoDB Atlas Account** (for database) - [Sign Up](https://www.mongodb.com/cloud/atlas)
3.  **Firebase Project** (for authentication) - [Console](https://console.firebase.google.com/)

---

## 📥 Setup Instructions (Step-by-Step)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Task_Manager
```

### 2. Setup the Server (Backend)

Navigate to the `server` directory and install dependencies:

```bash
cd server
npm install
```

#### **Configure Environment Variables (`server/.env`)**
Create a `.env` file in the `server` folder and add the following:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
```

**How to get these values:**
*   **MONGODB_URI**: Log in to MongoDB Atlas -> Database -> Connect -> Drivers -> Copy the connection string (replace `<password>` with your database user password).
*   **GOOGLE_APPLICATION_CREDENTIALS**:
    1.  Go to Project Settings in Firebase Console.
    2.  Go to **Service accounts** tab.
    3.  Click **Generate new private key**.
    4.  Save the JSON file as `serviceAccountKey.json` inside the `server/` directory.

### 3. Setup the Client (Frontend)

Open a new terminal, navigate to the `client` directory, and install dependencies:

```bash
cd client
npm install
```

#### **Configure Environment Variables (`client/.env`)**
Create a `.env` file in the `client` folder and add your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**How to get these values:**
1.  Go to Project Settings in Firebase Console.
2.  Scroll down to **Your apps** section.
3.  Click on the Web (`</>`) icon to register a new app.
4.  Copy the `firebaseConfig` object values into your `.env` file.

---

## ▶️ Running the Application

You need to run both the server and client simultaneously.

### **1. Start the Backend Server**
In the `server` terminal:
```bash
node index.js
# OR
npm run dev (if nodemon is installed)
```
*You should see: `Server running on port 5000` and `MongoDB Connected`.*

### **2. Start the Frontend Client**
In the `client` terminal:
```bash
npm run dev
```
*Click the localhost link (usually `http://localhost:5173`) to open the app.*

---

## 🧪 Demo Credentials (Optional)

You can simple Register a new account, or use these demo details if setup in your DB:

*   **Email**: `user1@gmail.com`
*   **Password**: `user12345`

---

## � Project Structure

```
Task_Manager/
├── client/                 # Frontend React App
│   ├── src/
│   │   ├── components/     # Reusable UI Components (Header, TaskCard, etc.)
│   │   ├── contexts/       # Global State (Auth, Theme)
│   │   ├── pages/          # Application Pages (Login, Dashboard, etc.)
│   │   └── ...
│   ├── .env                # Firebase Config
│   └── ...
│
├── server/                 # Backend Node.js API
│   ├── models/             # Mongoose Models (Task)
│   ├── routes/             # API Routes
│   ├── middleware/         # Auth Middleware
│   ├── serviceAccountKey.json # Firebase Admin Key (DO NOT COMMIT)
│   ├── .env                # Backend Config (DO NOT COMMIT)
│   └── ...
└── README.md               # Project Documentation
```

Happy Coding! 🚀
