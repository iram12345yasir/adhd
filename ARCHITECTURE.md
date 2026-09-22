# ADHD platform architecture

## Frontend
React + Vite + Tailwind powers authenticated patient, clinician, and admin portals. Webflow is supported as the public marketing shell: publish the landing pages in Webflow and link the CTA buttons to the React app, or embed the React build with a custom code mount/iframe. Do not place patient or clinician data in Webflow CMS.

## API
The backend is now NestJS with `/api/health`, `/api/auth/register`, `/api/auth/login`, `/api/auth/me`, `/api/tasks`, and `/api/habits`. The existing frontend `VITE_API_URL` remains compatible.

## PostgreSQL and Redis
PostgreSQL is managed by Prisma. Redis is configured through `REDIS_URL` for the next cache/session worker integration. Keep Redis private and never expose its URL to Vite.

## Run
```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name nest-migration
npm run dev
```

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Use `http://localhost:3000` for React and `http://localhost:5000/api/health` for the API. If a browser says connection refused, the relevant process is not running or the remote port is not forwarded.
