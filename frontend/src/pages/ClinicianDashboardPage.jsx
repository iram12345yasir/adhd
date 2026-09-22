@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
  --bg: #050816;
  --panel: rgba(15, 23, 42, 0.72);
  --panel-strong: rgba(15, 23, 42, 0.92);
  --line: rgba(148, 163, 184, 0.2);
  --text: #edf2ff;
  --muted: #a5b4cf;
  --violet: #7c3aed;
  --cyan: #22d3ee;
  --mint: #34d399;
  --blush: #f472b6;
}

* {
  box-sizing: border-box;
}

html, body, #root {
  min-height: 100%;
  margin: 0;
}

body {
  font-family: Inter, 'Segoe UI', sans-serif;
  background:
    radial-gradient(circle at top left, rgba(124, 58, 237, 0.32), transparent 28%),
    radial-gradient(circle at bottom right, rgba(34, 211, 238, 0.2), transparent 28%),
    linear-gradient(135deg, #030712 0%, #111827 55%, #0f172a 100%);
  color: var(--text);
}

button, input, select, textarea {
  font: inherit;
}

input, select, textarea {
  background: rgba(15, 23, 42, 0.72);
  color: var(--text);
  border: 1px solid rgba(148, 163, 184, 0.18);
}

button {
  cursor: pointer;
}

.app-loader {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  background: #020617;
  color: #e2e8f0;
}

.loader-ring {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 3px solid rgba(148, 163, 184, 0.18);
  border-top-color: #67e8f9;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.app-shell {
  min-height: 100vh;
  padding: 20px;
}

.workspace-shell {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 1024px) {
  .workspace-shell {
    flex-direction: row;
    align-items: flex-start;
  }
}

.workspace-main {
  flex: 1;
  min-width: 0;
}

.glass-panel {
  border: 1px solid rgba(148, 163, 184, 0.16);
  background: rgba(15, 23, 42, 0.62);
  backdrop-filter: blur(18px);
  border-radius: 28px;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.42);
}

.sidebar {
  width: 100%;
  max-width: 280px;
  border-radius: 28px;
  padding: 24px 18px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-link {
  display: block;
  color: #dfe7ff;
  text-decoration: none;
  border-radius: 16px;
  padding: 12px 14px;
  transition: 180ms ease;
}

.nav-link:hover {
  background: rgba(148, 163, 184, 0.08);
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 30px rgba(103, 232, 249, 0.15);
}

.page-card {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 30px;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.36);
}

.metric-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.metric-card {
  background: rgba(15, 23, 42, 0.74);
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 24px;
  padding: 18px 18px 16px;
}

.metric-card h3 {
  color: #e2e8f0;
  font-size: 2rem;
  margin: 12px 0 0;
  font-weight: 800;
}

.metric-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #94a3b8;
}

.metric-detail {
  font-size: 12px;
  color: #b7c4db;
  margin-top: 4px;
}

.hero-shell {
  min-height: 100vh;
  padding: 24px 18px;
}

.hero-panel {
  max-width: 1200px;
  margin: 0 auto;
}

.button-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, var(--violet), var(--cyan));
  color: white;
  border: none;
  border-radius: 18px;
  padding: 14px 22px;
  font-weight: 700;
  box-shadow: 0 18px 30px rgba(124, 58, 237, 0.3);
}

.button-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(15, 23, 42, 0.72);
  color: white;
  border-radius: 18px;
  padding: 14px 22px;
  font-weight: 700;
}

.hero-grid {
  display: grid;
  gap: 40px;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
}

h1, h2, h3, h4, p {
  margin-top: 0;
}

.text-muted {
  color: var(--muted);
}

.input-default {
  width: 100%;
  padding: 13px 14px;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(15, 23, 42, 0.7);
  color: white;
}

.widget-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.status-pill {
  display: inline-flex;
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  padding: 7px 10px;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.ring-progress {
  width: 100%;
  height: 10px;
  background: rgba(148, 163, 184, 0.12);
  border-radius: 999px;
  overflow: hidden;
}

.ring-progress > span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #8b5cf6, #22d3ee);
}

.workstation-grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.95fr) minmax(0, 1.5fr);
  gap: 20px;
}

@media (max-width: 1100px) {
  .workstation-grid {
    grid-template-columns: 1fr;
  }
}

.service-panel {
  border-radius: 26px;
  padding: 18px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.14);
}

.map-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

@media (max-width: 640px) {
  .app-shell { padding: 12px; }
  .sidebar { max-width: none; }
}
