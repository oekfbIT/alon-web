# Alon Yakoby portfolio (Vite)

Adapted from Dafna Dassa's portfolio (same design and code), rewritten with Alon's CV, cover letter and references. Set up as a Vite project for Vercel's free (Hobby) plan.

## Run it locally
```bash
npm install      # once
npm run dev      # http://localhost:5173, reloads on save
npm run build    # production build into dist/
npm run preview  # serve the dist/ build locally
```
Double-clicking `index.html` no longer works (paths are now absolute, e.g. `/src/style.css`). Use `npm run dev`.

## Where things are
| What | File |
|---|---|
| Homepage | `index.html` |
| Case studies | `work/*.html` (any new `.html` file here is built automatically) |
| Styles | `src/style.css` |
| Interactions | `src/main.js` |
| Things I’ve built (project cards, filters) | `src/projects.js`: edit the `projects` and `categories` data |
| Case-study screenshots | `public/work/oekfb/` |
| Toolbox (skill cloud, strongest skills) | `src/toolbox.js`: edit `skills` (level, since) and `groups` |
| Résumé timeline + printable résumé | `resume.html` and the `#resume` section of `index.html` |
| "Ask me" chat: what it knows | `src/knowledge.js` (one short, true answer per entry) |
| "Ask me" chat: logic | `src/ask.js` (browser), `src/retrieve.js` (search), `api/ask.js` (Vercel function) |
| Files served as-is (portrait, link preview image) | `public/` → served from `/` |

The portrait goes in `public/alon-portrait.jpg` (portrait orientation, about 4:5); until it exists a placeholder shows. The site has no CV download by choice.

Employment references (Dienstzeugnisse) are quoted in English translation on the homepage rather than attached, because the PDFs contain a date of birth, a home address and bank details.

## Deploy to Vercel
1. Push this folder to a GitHub repo (this folder as the repo root).
2. On vercel.com: **Add New → Project**, import the repo. Vercel detects Vite
   (build command `npm run build`, output `dist`). Click **Deploy**.
3. Every push to `main` redeploys; other branches get preview URLs you can open from anywhere.
4. Custom domain: Project → **Settings → Domains**, add the domain, then set the DNS records
   Vercel shows at your domain registrar. HTTPS is automatic.

After the domain is live, change `og:image` in each page to the full URL
(`https://yourdomain/og-image.png`), since LinkedIn and others need an absolute URL for link previews.

## Case studies
Published (Selected work on the homepage, linked to each other with Previous/Next):
oekfb-federation-platform, thatsit-vision-matching, adesso-release-pipeline, bridge-hotel-self-checkin.

Dafna's original case studies, portrait and preview image are kept in `_archive/dafna/` (not built or published).

## The "Ask me" chat
Questions are matched against `src/knowledge.js` with a small BM25 search.
- Locally (`npm run dev`) and on Vercel without a key, it answers directly from the best-matching entries ("from my notes").
- On Vercel with a model: add `ANTHROPIC_API_KEY` under Project → Settings → Environment Variables (optional `ASK_MODEL`).
  `api/ask.js` then lets the model write the answer, only from the retrieved entries, with sources. It has a simple rate limit.
`src/toolkit.js` (the old dark skills grid) is no longer used and can be deleted.
