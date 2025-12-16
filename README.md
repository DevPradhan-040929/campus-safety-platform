# 🚨 Campus Safety & Incident Reporting Platform

A real-time campus safety platform that allows students and staff to report incidents, request emergency help, and track safety alerts securely.

This project is built as a **learning-focused, production-inspired system** using Agile practices, Git, CI/CD, Cloud deployment, JWT authentication, SQL database, and Observability.

---

## 📌 Problem Statement
Campuses often lack a centralized, real-time system for reporting safety incidents, emergencies, or suspicious activities. This leads to delayed responses and poor communication.

---

## ✅ Solution
This platform enables:
- Secure user authentication (JWT)
- Real-time incident reporting
- Role-based access (Student, Security, Admin)
- Cloud-ready backend
- Scalable architecture with observability

---

## 🧩 Key Features
- 🔐 JWT-based authentication & authorization
- 🚨 Incident reporting with severity levels
- 📍 Location-based alerts (future scope)
- 📊 Admin dashboard (planned)
- 🗄️ SQL database for structured data
- ☁️ Cloud & CI/CD ready architecture
- 📈 Logging & monitoring (observability)

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication

### Frontend (Planned)
- React.js
- Tailwind CSS

### DevOps & Cloud
- Git & GitHub
- GitHub Actions (CI/CD)
- Docker (future)
- Cloud deployment (AWS / GCP planned)
- Observability (Logs & Metrics)

---

## 🏗️ Project Structure

campus-safety-platform/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── middleware/
│ │ ├── app.js
│ │ └── server.js
│ ├── package.json
│ └── package-lock.json
├── frontend/
│ └── README.md
├── docs/
├── .gitignore
└── README.md


---

## 🚀 Getting Started (Backend)

```bash
cd backend
npm install
npm run dev


Server will start on:

http://localhost:5000

🔐 Environment Variables

Create a .env file in backend/:

PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/campus_db
JWT_SECRET=supersecretkey

🔄 Agile Methodology

Iterative development

Feature-based commits

Incremental enhancements

Continuous feedback & improvement

📈 CI/CD & Observability (Planned)

Automated build & test using GitHub Actions

Cloud deployment

Centralized logging & monitoring

👨‍💻 Author

Dev Pradhan

📌 Status

🟡 In active development



