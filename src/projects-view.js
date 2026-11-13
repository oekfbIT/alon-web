/* Projects section: projects with a preview image as large cards, everything else as a compact list.
   Data: src/projects-data.js. Add `image: '/work/...webp'` to a project to promote it to a card. */
import { projects, categories, projectUrl } from './projects-data.js';
import { roleById, roleUrl, logoUrl } from './roles.js';

const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; };
const ext = (a, href) => { if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; } };
const status = (p) => el('span', 'pj-status' + (p.status === 'Live' ? ' is-live' : p.status === 'In progress' ? ' is-progress' : ''), p.status);
function logo(r) {
  const lg = el('span', 'logo'); lg.dataset.mono = r ? r.mono : '✦'; lg.setAttribute('aria-hidden', 'true');
  if (r) { const img = el('img'); img.src = logoUrl(r.id); img.alt = ''; img.width = 40; img.height = 40; img.loading = 'lazy'; img.addEventListener('error', () => img.remove()); lg.append(img); }
  return lg;
}
const orgName = (p) => { const r = p.org && roleById[p.org]; return r ? r.short : 'Own project'; };

function feature(p) {
  const r = p.org && roleById[p.org];
  const a = el('a', 'pf-card'); a.href = projectUrl(p);
  const media = el('span', 'pf-media');
  const img = el('img'); img.src = p.image; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
  media.append(img, status(p));
  const body = el('span', 'pf-body');
  const meta = el('span', 'pf-meta'); meta.append(logo(r), el('span', null, `${orgName(p)} · ${categories[p.cat].label}`));
  body.append(meta, el('b', 'pf-title', p.title), el('span', 'pf-text', p.text));
  const tech = el('span', 'pf-tech'); tech.textContent = p.tech.slice(0, 5).join(' · ');
  body.append(tech);
  a.append(media, body);
  return a;
}

function row(p) {
  const r = p.org && roleById[p.org];
  const li = el('li');
  const a = el('a', 'pl-row'); a.href = projectUrl(p);
  const txt = el('span', 'pl-txt');
  txt.append(el('b', null, p.title), el('small', null, `${orgName(p)} · ${categories[p.cat].label}`));
  a.append(logo(r), txt, status(p));
  li.append(a);
  return li;
}

const root = document.getElementById('projects-view');
if (root) {
  const withImg = projects.filter((p) => p.image);
  const rest = projects.filter((p) => !p.image);
  const feat = root.querySelector('.pf-grid');
  withImg.forEach((p) => feat.append(feature(p)));
  const list = root.querySelector('.pl-list');
  if (list) rest.forEach((p) => list.append(row(p)));
  if (list && !rest.length) { list.remove(); root.querySelector('.more-title')?.remove(); }
}
