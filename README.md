# Campus Safety & Incident Reporting Platform

## Overview
This project is a web-based platform designed to improve safety inside a university campus. It allows students and staff to report safety incidents in real time and enables campus security teams to respond quickly.

## Problem It Solves
In many campuses, safety incidents are reported late or not reported at all. There is no centralized system to track incidents or manage responses.

## Target Users
- Students
- Faculty and Staff
- Security Administrators
- System Administrators

## Vision Statement
To build a secure and reliable real-time campus safety system that improves incident response and communication.

## Key Features
- User login and authentication
- Incident reporting
- Incident tracking
- Admin dashboard
- SQL database

## Success Metrics
- Faster incident reporting
- Reduced response time
- System availability

## Assumptions and Constraints
**Assumptions**
- Users have internet access

**Constraints**
- Limited time
- Academic project scope

## Branching Strategy
This project uses GitHub Flow:
- `main` branch for stable code
- `feature/*` branches for new features



### Prerequisites
- Git
- Docker (optional – project also builds via GitHub Actions)

### Steps

1. Clone the repository
   ```bash
   git clone https://github.com/<your-username>/campus-safety-platform.git
   cd campus-safety-platform/backend
Build Docker image

docker build -t campus-backend .
Run backend service

docker run -p 5000:5000 campus-backend
Open in browser

http://localhost:5000

📌 That’s it.  
📌 Even if Docker is not installed locally, CI/CD builds the image in cloud.

---

# 🟢 PART 2: BRANCHING STRATEGY (THIS IS JUST THEORY)

Also add **this section** to `README.md`.

---

## 🌿 Branching Strategy

```md
This project follows **GitHub Flow**:

- `main` branch always contains stable, production-ready code.
- New features are developed in separate feature branches.
- Feature branches are merged into `main` via Pull Requests after review.

### Branch Naming Convention
- feature/backend-setup
- feature/dockerization
- feature/jwt-auth

## Software Design

This project follows a layered architecture separating frontend, backend, and database.

### Design Summary
The system is modular with low coupling and high cohesion. Separate modules handle authentication, incident management, and notifications, improving maintainability and scalability.

### UI Design
Figma prototype link:
https://www.figma.com/make/ELZjJx0hEZmEsHZgDF2k3Q/Campus-Safety---Incident-Reporting-Platforms?fullscreen=1&t=NbRamP1NZQizUycL-1