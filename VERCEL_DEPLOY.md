# Vercel + Render deployment

## Vercel frontend
1. Import `https://github.com/iram12345yasir/adhd` into Vercel.
2. Set the Vercel project Root Directory to `frontend`.
3. Vercel will use `frontend/vercel.json`.
4. Add this environment variable in Vercel:

```env
VITE_API_URL=https://YOUR-RENDER-SERVICE.onrender.com/api
```

5. Deploy or redeploy after saving the variable.

## Render backend
Deploy the backend using `render.yaml` or create a Node web service with:

- Root directory: `backend`
- Build command: `npm install && npx prisma generate && npx prisma migrate deploy`
- Start command: `npm start`

Set these Render environment variables:

```env
DATABASE_URL=your-production-postgresql-url
JWT_SECRET=your-long-random-secret
FRONTEND_URL=https://YOUR-VERCEL-PROJECT.vercel.app
NODE_ENV=production
PORT=10000
```

After the backend deploys, verify:

```text
https://YOUR-RENDER-SERVICE.onrender.com/api/health
```

Then update `VITE_API_URL` in Vercel to the real Render URL and redeploy the frontend.

## Important
- Do not use `localhost` in the Vercel environment.
- Never expose `DATABASE_URL`, `JWT_SECRET`, or `REDIS_URL` to Vite.
- If using a custom Vercel domain, set `FRONTEND_URL` to that exact HTTPS origin and redeploy the backend.
- The frontend uses React Router; the Vercel rewrite prevents refreshes on portal routes from returning 404.
