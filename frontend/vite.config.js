import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Remote preview hosts need to be explicitly trusted by Vite's dev server.
// The leading dot allows any subdomain under vercel.run while keeping the
// allow-list narrower than `allowedHosts: true`.
const allowedHosts = [
  "localhost",
  "127.0.0.1",
  ".vercel.run",
  ...(process.env.VITE_ALLOWED_HOST ? [process.env.VITE_ALLOWED_HOST] : [])
];

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 3000,
    allowedHosts
  },
  preview: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 4173,
    allowedHosts
  }
});
