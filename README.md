🧠 Task Manager (Full Stack Assessment)

A complete Task Management System built as part of a Software Engineering assessment.
The application allows users to securely register, log in, and manage their personal tasks with full CRUD functionality.

🚀 Features
🔐 Authentication & Security

User Registration & Login

JWT Authentication (Access + Refresh Tokens)

Secure password hashing using bcrypt

Auto token refresh (seamless session handling)

📝 Task Management

Create, Read, Update, Delete tasks

Toggle task status (Completed / Pending)

Tasks are user-specific (secure isolation)

🔍 Advanced Features

Search tasks by title

Filter tasks (All / Completed / Pending)

Backend pagination (real, not frontend slicing)

Displays total task count

Task creation date shown

🎨 UI/UX

Responsive design (desktop + mobile)

Clean dashboard layout

Modal for create/edit task

Toast notifications (react-hot-toast)

Smooth user experience

🛠️ Tech Stack
Backend

Node.js

Express.js

TypeScript

Prisma ORM

SQLite (can be swapped with any SQL DB)

JWT (Access + Refresh Tokens)

bcrypt

Frontend

Next.js (App Router)

TypeScript

React

Custom CSS (no UI framework)

📁 Project Structure
task-manager/
│
├── task-manager-backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│
├── task-manager-frontend/
│   ├── app/
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   └── services/
│
└── README.md
⚙️ Setup Instructions
1️⃣ Clone Repository
git clone <your-repo-url>
cd task-manager
2️⃣ Backend Setup
cd task-manager-backend
npm install

Create .env file:

DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret_key"
JWT_REFRESH_SECRET="your_refresh_secret"

Run Prisma:

npx prisma migrate dev --name init

Start server:

npm run dev

Backend runs on:

http://localhost:5000
3️⃣ Frontend Setup
cd task-manager-frontend
npm install
npm run dev

Frontend runs on:

http://localhost:3000
🔐 API Endpoints
Auth

POST /auth/register

POST /auth/login

POST /auth/refresh

POST /auth/logout

Tasks

GET /tasks?page=&limit=&search=&status=

POST /tasks

PATCH /tasks/:id

DELETE /tasks/:id

PATCH /tasks/:id/toggle

🧪 Testing

Backend: Postman / Thunder Client

Frontend: Browser UI

📌 Assignment Coverage

This project fulfills all required criteria:

Backend

✅ JWT Authentication (Access + Refresh Tokens)

✅ Secure password hashing

✅ Protected routes

✅ Task CRUD

✅ Pagination, Filtering, Searching

✅ TypeScript + ORM (Prisma)

Frontend

✅ Login & Registration

✅ Dashboard with task listing

✅ CRUD operations UI

✅ Filtering & Searching

✅ Backend pagination integration

✅ Toast notifications

✅ Responsive design

💡 Future Improvements

Due dates & reminders

Drag & drop tasks

Dark mode

Better analytics (task stats)

Deployment (Vercel + Render)

👨‍💻 Author

Vivek Shivam Saharia

⭐ Final Note

This project demonstrates:

Full-stack development skills

API design & security

Real-world state management

Clean UI/UX practices