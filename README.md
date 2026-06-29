# SkillSwap Server

REST API for SkillSwap freelance marketplace.

## 🌐 Live API

https://b13-a10-skillswap-server.vercel.app/

## Frontend

https://b13-a10-skillswap.vercel.app/

---

# Features

- REST API
- MongoDB Database
- JWT Authentication
- Firebase Token Verification
- CRUD Operations
- Proposal Management
- Task Management
- Payment Flow Support
- Deliverable Submission

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT
- Firebase Admin SDK
- CORS
- Dotenv

---

# Project Structure

src/
│
├── app/
│ ├── modules/
│ │ ├── tasks/
│ │ ├── proposals/
│ │ ├── auth/
│ │ └── users/
│
├── config/
├── middleware/
├── utils/
└── server.js

---

# Environment Variables

Create `.env`

```env
PORT=5000

DATABASE_URL=your_mongodb_uri

JWT_SECRET=your_secret

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

---

# Installation

Clone Repository

```bash
git clone https://github.com/your-username/b13-a10-skillswap-server.git
```

Go to project

```bash
cd b13-a10-skillswap-server
```

Install packages

```bash
npm install
```

Run Development Server

```bash
npm run dev
```

Production

```bash
npm start
```

---

# API Endpoints

## Authentication

```
POST /api/auth/login
POST /api/auth/register
```

---

## Tasks

```
GET /api/tasks
GET /api/tasks/:id
GET /api/tasks/my-tasks
GET /api/tasks/active
GET /api/tasks/completed

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id

PATCH /api/tasks/:id/status

PATCH /api/tasks/:id/deliverable
```

---

## Proposals

```
POST /api/proposals

GET /api/proposals/client/:email

GET /api/proposals/freelancer/:email

PATCH /api/proposals/:id/accept

PATCH /api/proposals/:id/reject
```

---

# Database Collections

## users

```
name
email
photoURL
role
createdAt
```

## tasks

```
title
description
category
budget
deadline
client_name
client_email
assignedFreelancer
status
createdAt
updatedAt
```

## proposals

```
taskId
taskTitle
clientEmail
freelancerEmail
proposedBudget
estimatedDays
coverNote
status
createdAt
updatedAt
```

---

# Business Logic

### Task Lifecycle

```
Open

↓

Proposal Submitted

↓

Client Reviews Proposal

↓

Payment Complete

↓

In Progress

↓

Freelancer Uploads Deliverable

↓

Completed
```

---

# Security

- JWT Authentication
- Firebase Token Verification
- Protected Routes
- Input Validation
- MongoDB ObjectId Validation

---

# Future Improvements

- Stripe Payment
- Email Notification
- Socket.io Chat
- Review System
- Admin Dashboard
- Analytics

---

# Author

Md Saddam Hossain