import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'node:path';
import { readdirSync, existsSync } from 'node:fs';

// Every .html page is its own entry: index.html plus everything in work/.
// A new case study only needs a new file in work/; it is picked up automatically.
const workPages = Object.fromEntries(
  readdirSync(resolve(import.meta.dirname, 'work'))
    .filter((f) => f.endsWith('.html'))
    .map((f) => [`work/${f.replace('.html', '')}`, resolve(import.meta.dirname, 'work', f)])
);
// Role pages, generated from src/roles.js by scripts/build-roles.mjs.
const rolePages = Object.fromEntries(
  readdirSync(resolve(import.meta.dirname, 'experience'))
    .filter((f) => f.endsWith('.html'))
    .map((f) => [`experience/${f.replace('.html', '')}`, resolve(import.meta.dirname, 'experience', f)])
);

// Project pages, generated from src/projects-data.js by scripts/build-projects.mjs.
const projectDir = resolve(import.meta.dirname, 'projects');
const projectPages = existsSync(projectDir) ? Object.fromEntries(
  readdirSync(projectDir)
    .filter((f) => f.endsWith('.html'))
    .map((f) => [`projects/${f.replace('.html', '')}`, resolve(projectDir, f)])
) : {};

// Local dev: serve api/ask.js at /api/ask so the chat can be tested with `npm run dev`.
// Reads OPENAI_API_KEY (and ASK_MODEL) from .env.local. On Vercel the function runs natively.
function localApi() {
  return {
    name: 'local-api',
    configureServer(server) {
      const env = loadEnv('development', import.meta.dirname, '');
      for (const k of ['OPENAI_API_KEY', 'ASK_MODEL']) if (env[k]) process.env[k] = env[k];
      server.middlewares.use('/api/ask', async (req, res) => {
        let raw = '';
        for await (const chunk of req) raw += chunk;
        try { req.body = raw ? JSON.parse(raw) : {}; } catch { req.body = {}; }
        res.status = (code) => { res.statusCode = code; return res; };
        res.json = (obj) => { res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(obj)); return res; };
        const { default: handler } = await server.ssrLoadModule('/api/ask.js');
        await handler(req, res);
      });
    },
  };
}

export default defineConfig({
  plugins: [localApi()],
  build: {
    rollupOptions: {
      input: { main: resolve(import.meta.dirname, 'index.html'), resume: resolve(import.meta.dirname, 'resume.html'), chat: resolve(import.meta.dirname, 'chat.html'), ...workPages, ...rolePages, ...projectPages },
    },
  },
});
