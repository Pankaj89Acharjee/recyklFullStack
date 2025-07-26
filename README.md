# Recykl Device Manager - Full Stack Application

## 📦 About the Project

The **Recykl Device Manager** is a full-stack web application built with:

- **Frontend:** React (with TypeScript + TailwindCSS)
- **Backend:** Node.js (Express + TypeScript)
- **Database:** SQLite
- **Auth:** JWT-based authentication
- **Features:** Role-based access (Admin/User), Device management, Health telemetry tracking and adding, Recharts for visualization, Best Security Practices, Preventing Cross-Scripting, API Rate Limitation, Throttling, Caching with Node-Cache, Field Validation, Input Sanitization, Cookie Based Authorization, Contexts for Theme and User, Theme Toggling, Responsiveness and so on.

---

## 🚀 Features

- ✅ User Registration and Login with JWT
- ✅ Role-based UI rendering (Admin/User)
- ✅ Admin can:
  - Register new devices
  - View device status
  - Add & view health telemetry
  - Decommission devices
- ✅ Device health tracking (CPU, Temperature)
- ✅ Dark and Light theme toggle
- ✅ Responsive Grid and Table views for device listing
- ✅Recharts for visualization
- ✅API Rate Limitation
- ✅Throttling, Caching with Node-Cache
- ✅Input Sanitization, Cookie Based Authorization,

---

## Setup Instructions

---

## 🛠️ Setup Instructions

### 🔧 Prerequisites

- Node.js ≥ 18
- PostgreSQL
- Git

---

### 1️⃣ Backend Setup

```bash
git clone https://github.com/Pankaj89Acharjee/recyklFullStack.git
cd recyklFullStack
cd backend
cp .env.example .env     # Update database and JWT config
npm install
npx prisma generate      # If using Prisma ORM
npm run dev              # Starts the server

```

### 2️⃣ Frontend Setup

```bash
cd ../frontend
cp .env.example .env     # Update API base URL if needed
npm install
npm run dev              # Starts Vite dev server
```

- Frontend will be available at: http://localhost:5173
- Backend will be available at: http://localhost:5000


