# Running ADHD locally

`ERR_CONNECTION_REFUSED` means no process is listening on the address you opened. Start both services in separate terminals.

## Backend
```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

The API listens on `http://localhost:5000`. Check `http://localhost:5000/api/health`.

## Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open the exact URL printed by Vite, normally `http://localhost:3000`.

For Codespaces, containers, or a remote VM, use the forwarded port URL and keep Vite bound to `0.0.0.0` (already configured). Set `VITE_API_URL` to the public backend URL, then restart Vite after changing `.env`.

## Deployment
- Deploy `backend` with `render.yaml` or set Render root directory to `backend`.
- Deploy `frontend` to Vercel with root directory `frontend`, build command `npm run build`, output directory `dist`.
- Set backend `FRONTEND_URL` to the deployed Vercel URL and frontend `VITE_API_URL` to the deployed API URL ending in `/api`.
