# ADHD

A responsive ADHD productivity app with a modern multi-page interface, auth, Prisma + PostgreSQL backend, Tailwind styling, and glassmorphism visuals.

## Features
- Landing, login, register, dashboard, tasks, focus timer, habits, profile screens
- Responsive layout with dark, vibrant ADHD-friendly color palette
- JWT-based authentication
- PostgreSQL + Prisma integration
- Focus timer + task + habit workflows
- Protected routes and API access

## Stack
- Frontend: React + Vite + Tailwind CSS + React Router
- Backend: Node.js + Express + Prisma + PostgreSQL

## Local setup

### Backend
```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Environment variables

Backend `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/adhd?schema=public"
JWT_SECRET="replace-with-a-long-secret"
FRONTEND_URL="http://localhost:3000"
PORT=5000
```

Frontend `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## Default login
Use the register page to create a user, or you can log in with your own account.

## Production deployment
- Frontend: Vercel
- Backend: Render
- Database: Neon or Render PostgreSQL

Define:
- `VITE_API_URL` with the public backend URL
- `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL` on the backend
