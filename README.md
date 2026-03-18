# ☁️ Cloud Monitor API

A **production-ready backend system** for monitoring servers, tracking uptime, and sending alerts — built with **Node.js, Express, MongoDB, and JWT authentication**.

---

## 🚀 Features

### 🔐 Authentication & Security

* User Registration & Login
* JWT Authentication (Access + Refresh Tokens)
* Role-based Access Control (Admin / DevOps / Developer)
* Secure Logout with Refresh Token invalidation

### 🌐 Server Monitoring

* Add and manage servers (API / Website)
* Automatic health checks using Cron Jobs
* Track server status: **UP / DOWN**
* Store last checked timestamp

### 🚨 Alert System

* Email alerts when server goes DOWN
* Trigger alerts only on status change (UP → DOWN)
* Prevent alert spamming

### 📊 Monitoring Engine

* Background job runs every minute
* Checks server availability
* Updates status in database

---

## 🏗 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (Access + Refresh Tokens)
* **Scheduler:** node-cron
* **HTTP Client:** axios
* **Email Service:** nodemailer

---

## 📁 Project Structure

```
src/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   └── server.controller.js
│
├── middleware/
│   └── auth.middleware.js
│
├── models/
│   ├── user.model.js
│   └── server.model.js
│
├── routes/
│   ├── auth.routes.js
│   └── server.routes.js
│
├── services/
│   ├── auth.service.js
│   ├── monitor.service.js
│   └── email.service.js
│
└── app.js
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/cloud-monitor.git
cd cloud-monitor
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/cloud-monitor

JWT_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

### 4️⃣ Run the server

```bash
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## 🔗 API Endpoints

### 🔐 Auth Routes

#### Register

```
POST /api/auth/register
```

#### Login

```
POST /api/auth/login
```

#### Refresh Token

```
POST /api/auth/refresh
```

#### Logout

```
POST /api/auth/logout
```

---

### 🌐 Server Routes

#### Add Server

```
POST /api/servers
```

#### Get All Servers

```
GET /api/servers
```

---

## 🔑 Authentication

Use Bearer Token in headers:

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 🧪 Example Request

### Add Server

```json
{
  "name": "Production API",
  "url": "https://api.example.com"
}
```

---

## ⏱ Monitoring Flow

1. Cron job runs every minute
2. Fetch all servers from DB
3. Send HTTP request to each server
4. Update status (UP / DOWN)
5. Trigger alert if status changes

---

## 🚨 Alert Flow

```
UP → DOWN  → Send Email Alert
DOWN → DOWN → No alert (avoid spam)
```

---

## 📌 Future Improvements

* 📊 Dashboard (uptime %, analytics)
* 📉 Incident history tracking
* 🔁 Retry mechanism for false alerts
* 🔔 Slack / Webhook notifications
* 📱 Frontend dashboard (React)

---

## 👨‍💻 Author

**Souvik De**

---

## ⭐ Why This Project?

This project demonstrates:

* Scalable backend architecture
* Secure authentication system
* Real-time monitoring logic
* Event-driven alert system

👉 Ideal for **Senior Node.js / Backend / DevOps roles**

---

## 📜 License

This project is licensed under the MIT License.
