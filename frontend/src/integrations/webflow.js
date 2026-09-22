export const webflowIntegration = {
  mode: 'headless-marketing-shell',
  description: 'Use Webflow for public marketing pages and React for authenticated portals.',
  apiBase: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  embed: 'Add the React build to a Webflow page using an iframe or custom code mount; keep auth and clinical data in React/API, never in Webflow CMS.',
};
