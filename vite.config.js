import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readdirSync } from 'node:fs';

// Every .html page is its own entry: index.html plus everything in work/.
// A new case study only needs a new file in work/; it is picked up automatically.
const workPages = Object.fromEntries(
  readdirSync(resolve(import.meta.dirname, 'work'))
    .filter((f) => f.endsWith('.html'))
    .map((f) => [`work/${f.replace('.html', '')}`, resolve(import.meta.dirname, 'work', f)])
);

export default defineConfig({
  build: {
    rollupOptions: {
      input: { main: resolve(import.meta.dirname, 'index.html'), resume: resolve(import.meta.dirname, 'resume.html'), ...workPages },
    },
  },
});
