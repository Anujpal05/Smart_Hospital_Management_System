# 🏥 Smart Hospital Management System

A full-stack web application designed to digitize and streamline common hospital operations. The system brings patient and doctor management, appointment scheduling, ward and bed allocation, admissions, medical reports, billing, and AI-assisted healthcare conversations into one platform.

<p align="center">
  <a href="https://github.com/Anujpal05/Smart_Hospital_Management_System"><strong>GitHub Repository</strong></a>
  &nbsp;·&nbsp;
  <a href="https://meddical-hms.netlify.app/"><strong>Live Demo</strong></a>
</p>

---

## ✨ Features

### 👥 Authentication and User Management
- User registration and login.
- JWT-based authentication.
- Password hashing with `bcryptjs`.
- Role-oriented workflows for Admin, Doctor, and Patient users.
- User profile retrieval and updates.
- Account activation and deactivation endpoints.
- Email verification workflow using Nodemailer.

### 🧑‍⚕️ Doctor Management
- Add and view doctor profiles.
- Retrieve doctor details.
- Update doctor information and profile images.
- Doctor-specific appointment views.

### 🧑‍🤝‍🧑 Patient Management
- Register and manage patient records.
- Retrieve patient details and patient lists.
- View patients associated with a doctor.
- Update patient profiles and profile images.
- Remove patient records.

### 📅 Appointment Management
- Create and book appointments.
- View all appointments and pending appointments.
- Retrieve appointments by doctor or patient.
- View appointment details.
- Update/respond to appointment requests and track their status.

### 🏥 Ward and Bed Management
- Create and view hospital wards.
- Create and view beds.
- Track bed availability and status, including available, occupied, and maintenance states.
- Associate beds with patient admissions.

### 🛏️ Patient Admission and Discharge
- Admit a patient to a ward and bed.
- Maintain admission records.
- Discharge admitted patients.
- Update bed occupancy when admission/discharge operations are performed.

### 🧾 Medical Reports and Records
- Create, view, and update medical reports.
- Retrieve reports for an individual patient.
- Store clinical details, diagnosis-related information, samples, and report attachments as supported by the report model.
- Delete individual medical reports.
- Generate/download report PDFs in the frontend.

### 💊 Medication Management
- Medication-related data model and medication route definitions are included.
- The medication routes are not currently mounted in the main Express application, and some route handlers are not connected. This module needs integration before it can be considered fully available through the API.

### 💳 Billing and Payment Records
- Create and retrieve hospital bills.
- Add categorized bill items and calculate bill totals.
- Apply tax and discount values where configured by the bill model.
- Create and retrieve payment records.
- Update payment status and record payment methods/statuses.

> The code includes payment record management. A third-party payment gateway integration (such as Razorpay or Stripe) is not established in the supplied source.

### 🤖 AI Healthcare Assistant
- AI healthcare chat interface.
- Healthcare-focused system instructions.
- Google Gemini and Groq SDK integrations are included.
- The Groq service uses the `llama-3.3-70b-versatile` model; the Gemini service uses `gemini-2.0-flash`.
- The assistant is intended to provide general healthcare information and direct users to medical professionals for serious concerns.

> The AI assistant is informational only. It is not a medical diagnostic tool and must not replace professional medical advice. The current chat implementation does not establish automatic retrieval of a patient's complete medical history from the database.

### 📹 Real-Time Communication and Video Consultation
- Socket.IO server for real-time room communication.
- Room join and user connection/disconnection events.
- PeerJS-based peer connection support for video calls.
- Real-time messages within a room.

### 📊 Dashboards and User Interface
- Separate Admin, Doctor, and Patient dashboard areas.
- Calendar-based appointment interface.
- Charts and visual summaries using Recharts.
- Toast notifications and icon-based UI elements.
- Responsive styling with Tailwind CSS.

---

## 🧰 Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React 19, React DOM, Vite 7 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| State management | Redux Toolkit, React Redux |
| HTTP requests | Axios |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose 9 |
| Authentication | JSON Web Tokens (`jsonwebtoken`), `bcryptjs` |
| Real-time communication | Socket.IO, Socket.IO Client |
| Video communication | PeerJS |
| AI integrations | Google Generative AI SDK, Groq SDK |
| File and image handling | Multer, Cloudinary |
| Email | Nodemailer |
| Charts and calendar | Recharts, React Big Calendar |
| PDF and image export | jsPDF, html2canvas |
| Utilities and UI | Moment.js, UUID, Lucide React, React Icons, React Hot Toast, React Toastify |

---

## 🏗️ Project Structure

```text
Smart_Hospital_Management_System/
│
├── client/                         # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── Components/             # Reusable UI and dashboard components
│   │   │   ├── Auth/
│   │   │   ├── DashBoard/
│   │   │   ├── Forms/
│   │   │   └── Home/
│   │   ├── Dashboard/               # Role-specific dashboard pages
│   │   │   ├── Admin/
│   │   │   ├── Doctors/
│   │   │   └── patient/
│   │   ├── Pages/                  # Public-facing pages
│   │   ├── actions/                # Redux actions
│   │   ├── reducer/                # Reducers
│   │   ├── slices/                 # Redux Toolkit slices
│   │   ├── services/               # AI service integrations
│   │   ├── store/                  # Redux store
│   │   ├── utils/                  # Shared utilities and API helpers
│   │   └── socket.js               # Socket.IO client setup
│   └── package.json
│
├── server/                         # Node.js + Express backend
│   ├── src/
│   │   ├── config/                 # Database/service configuration
│   │   ├── controllers/            # Request handlers and business logic
│   │   ├── data/                   # Seed/static data
│   │   ├── models/                 # Mongoose schemas and models
│   │   ├── routes/                 # Express API routes
│   │   ├── templates/              # Email templates
│   │   └── utils/                  # Middleware and helper functions
│   ├── index.js                    # Express and Socket.IO entry point
│   └── package.json
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Install the following before running the application:

- [Node.js](https://nodejs.org/) (a current LTS release is recommended)
- npm (included with Node.js)
- [MongoDB](https://www.mongodb.com/) local installation or MongoDB Atlas account
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Anujpal05/Smart_Hospital_Management_System.git
cd Smart_Hospital_Management_System
```

### 2. Configure the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
NODE_ENV=development

# Cloudinary (required for configured image/file upload flows)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Email verification (Gmail OAuth2 configuration)
EMAIL=your_email_address
CLIENT_ID=your_google_oauth_client_id
CLIENT_SECRET=your_google_oauth_client_secret
REFRESH_TOKEN=your_google_oauth_refresh_token

# Used when generating links in email workflows
BASE_URL=http://localhost:5000
```

Use your own credentials. 

Start the backend:

```bash
npm run dev
```

The backend runs on `http://localhost:5000` by default. The root endpoint should respond with:

```text
🏥 Smart Hospital API Running...
```

### 3. Configure the frontend

Open a second terminal:

```bash
cd client
npm install
```

Create a `.env` file inside the `client/` directory:

```env
VITE_BASE_URL=http://localhost:5000
VITE_GROQ_API_KEY=your_groq_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

The AI service integrations use the Groq and Gemini keys respectively.

Start the frontend:

```bash
npm run dev
```

Vite prints the local frontend URL in the terminal (commonly `http://localhost:5173`). Open that URL in your browser.

---

## 🔌 Backend API Overview

The backend exposes the following API groups. The base URL in local development is `http://localhost:5000`.

| Prefix | Purpose |
|---|---|
| `/api/auth` | Registration and login |
| `/api/user` | User information, role queries, profile/password updates, activation and email verification |
| `/api/doctor` | Doctor creation, listing, retrieval and updates |
| `/api/patient` | Patient creation, listing, retrieval, updates and deletion |
| `/api/wards` | Ward creation and retrieval |
| `/api/beds` | Bed creation, listing, retrieval and status updates |
| `/api/appointments` | Appointment creation, listing, retrieval and responses |
| `/api/admissions` | Patient admission and discharge |
| `/api/bills` | Bill creation and retrieval |
| `/api/payments` | Payment record creation, retrieval and status updates |
| `/api/reports` | Medical report creation, retrieval, updates and deletion |
| `/api/counters` | Counter retrieval and deletion |

Most resource endpoints use JWT authentication middleware. Check the corresponding route files before exposing endpoints publicly; authentication and authorization coverage should be reviewed before production deployment.

---

## 🔐 Security and Production Notes

This repository is a development/academic project and should be reviewed before handling real patient information.

- Move all AI provider API calls and credentials to the backend. Never expose provider secrets in frontend environment variables.
- Ensure API responses never include password hashes, JWTs, verification tokens, or other sensitive authentication data.
- Apply centralized role-based authorization to every protected resource and verify that users can access only records they are permitted to see.
- Protect every administrative/destructive endpoint with authentication and appropriate authorization.
- Restrict CORS to trusted frontend origins in production.
- Validate and sanitize request data, uploaded files, and file types.
- Use HTTPS, secure cookie/token handling, rate limiting, audit logging, and secure secret management.
- Use database backups and appropriate retention/access policies for medical information.
- Review applicable healthcare privacy and data-protection requirements before real-world use.
- Do not rely on AI-generated responses as a diagnosis or treatment decision.

---

## 🚀 Deployment

The application has two separately runnable parts, so deploy the frontend and backend and configure their environment variables independently.

- **Frontend:** can be deployed to a static frontend host such as Vercel or Netlify. Set `VITE_BASE_URL` to the deployed backend URL at build time.
- **Backend:** deploy the Express server to a Node.js hosting platform. Configure `PORT`, `MONGO_URI`, `JWT_SECRET`, and the required service credentials.
- **Database:** use MongoDB Atlas or another securely managed MongoDB deployment.
- **Real-time features:** ensure the backend host supports persistent WebSocket connections for Socket.IO.
- **CORS:** configure the backend to allow the deployed frontend origin.
- **AI:** move provider requests to the backend before publishing a public deployment.

---

## 👨‍💻 Contributors

- **Anuj Pal**
- **Krunal Lodha**

<p align="center">
  Made with ❤️ to improve and simplify hospital operations.
</p>
