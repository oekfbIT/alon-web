import { categories, projects } from './projects-data.js';
import { roleById, roleUrl, logoUrl } from './roles.js';
export { categories, projects };

/* ---------- Rendering: an always-open grid of project cards ---------- */
const MAX_TECH = 4;
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
const slug = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function logoBadge(r, cls) {
  const lg = el('span', `logo ${cls}`); lg.dataset.mono = r ? r.mono : '✦'; lg.setAttribute('aria-hidden', 'true');
  if (r) {
    const img = el('img'); img.src = logoUrl(r.id); img.alt = ''; img.width = 40; img.height = 40; img.loading = 'lazy';
    img.addEventListener('error', () => img.remove());
    lg.append(img);
  }
  return lg;
}

function card(p) {
  const c = categories[p.cat];
  const r = p.org && roleById[p.org];
  const a = el('article', 'pj-card');
  a.dataset.cat = p.cat;
  a.style.setProperty('--c', c.color);

  // Preview image (or a placeholder until one is added)
  const media = el('a', 'pj-media');
  media.href = p.link; media.tabIndex = -1; media.setAttribute('aria-hidden', 'true');
  if (/^https?:/.test(p.link)) { media.target = '_blank'; media.rel = 'noopener'; }
  const ph = el('span', 'pj-ph');
  ph.append(logoBadge(r, 'logo-xl'), el('small', null, 'Preview coming soon'));
  media.append(ph);
  const img = el('img'); img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
  const ok = () => { if (img.naturalWidth > 0) media.classList.add('has-img'); };
  img.addEventListener('load', ok);
  img.addEventListener('error', () => img.remove());
  img.src = p.image || `/work/projects/${slug(p.title)}.webp`;
  media.append(img);
  if (img.complete) ok();
  const st = el('span', 'pj-status' + (p.status === 'Live' ? ' is-live' : p.status === 'In progress' ? ' is-progress' : ''), p.status);
  media.append(st);
  if (r) media.append(logoBadge(r, 'logo-sm pj-badge'));

  const body = el('div', 'pj-body');
  const cat = el('span', 'pj-cat');
  const dot = el('i', 'pj-dot'); dot.style.setProperty('--c', c.color);
  cat.append(dot, c.label);
  const h = el('h3'); const hl = el('a', null, p.title); hl.href = p.link;
  if (/^https?:/.test(p.link)) { hl.target = '_blank'; hl.rel = 'noopener'; }
  h.append(hl);
  const t = el('p', null, p.text);
  const tech = el('ul', 'pj-tech');
  p.tech.slice(0, MAX_TECH).forEach((x) => tech.appendChild(el('li', null, x)));
  if (p.tech.length > MAX_TECH) { const m = el('li', 'more', '+' + (p.tech.length - MAX_TECH)); m.title = p.tech.slice(MAX_TECH).join(', '); tech.appendChild(m); }

  const foot = el('div', 'pj-foot');
  if (r) {
    const org = el('a', 'pj-org'); org.href = roleUrl(r.id); org.title = `More from ${r.org}`;
    const rest = p.when.includes('·') ? p.when.slice(p.when.indexOf('·') + 1).trim() : '';
    const txt = el('span', 'pj-org-txt'); txt.append(el('b', null, r.short)); if (rest) txt.append(el('small', null, rest));
    org.append(txt); foot.append(org);
  } else foot.append(el('span', null, p.when));
  const self = r && p.link === roleUrl(r.id);
  if (!self) {
    const link = el('a', 'pj-link', (p.linkLabel || 'Details') + ' ↗'); link.href = p.link;
    if (/^https?:/.test(p.link)) { link.target = '_blank'; link.rel = 'noopener'; }
    link.setAttribute('aria-label', `${p.linkLabel || 'Details'}: ${p.title}`);
    foot.append(link);
  }
  body.append(cat, h, t, tech, foot);
  a.append(media, body);
  return a;
}

const root = document.getElementById('projects-app');
if (root) {
  const filters = root.querySelector('.pj-filters');
  const grid = root.querySelector('.pj-grid');
  const cards = projects.map(card);
  cards.forEach((c) => grid.appendChild(c));

  const counts = { all: projects.length };
  projects.forEach((p) => { counts[p.cat] = (counts[p.cat] || 0) + 1; });
  const mk = (key, label, color) => {
    const b = el('button');
    b.type = 'button'; b.dataset.f = key; b.setAttribute('aria-pressed', String(key === 'all'));
    if (color) { const d = el('i', 'pj-dot'); d.style.setProperty('--c', color); b.append(d); }
    b.append(label, el('small', null, String(counts[key])));
    filters.appendChild(b);
  };
  mk('all', 'All');
  Object.entries(categories).forEach(([k, c]) => counts[k] && mk(k, c.label, c.color));
  filters.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    filters.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    cards.forEach((c) => { c.hidden = b.dataset.f !== 'all' && c.dataset.cat !== b.dataset.f; });
  });
}
