# Remote Vite preview

The remote preview error:

```text
This host (...) is not allowed
```

is fixed in `frontend/vite.config.js` by allowing the `.vercel.run` subdomain and binding Vite to `0.0.0.0`.

Restart the frontend after pulling the change:

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

For a specific host, you can also set:

```bash
VITE_ALLOWED_HOST=sb-4d4ggtm9ihj2.vercel.run npm run dev
```

Use the URL printed by Vite or the forwarded preview URL. This setting affects the Vite development/preview server; deployed Vercel builds are served by Vercel and do not run the Vite dev server.
