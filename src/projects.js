/* =========================================================
   Things I've built
   Edit the data below to add, remove or reorder projects.
   status: 'Live' | 'In progress' | 'Shipped' | 'Exploring'
   link: a case study (/work/...) or a live site; external links open in a new tab.
   ========================================================= */
export const categories = {
  ai: { label: 'AI & ML', color: '#0f9488' },
  full: { label: 'Full-Stack', color: '#4f6bd8' },
  backend: { label: 'Backend & Data', color: '#c2410c' },
  mobile: { label: 'Mobile', color: '#a3489b' },
  delivery: { label: 'Delivery & Infra', color: '#64748b' },
};

export const projects = [
  {
    cat: 'ai', status: 'In progress', title: 'AI Match Analysis',
    text: 'Takes a match recording or live stream and finds shots and key events, tracks where players move and identifies who they are from preloaded squads. YOLOv8 trained on my own Label Studio data, connected to my backend, with an MCP-connected vision model.',
    tech: ['YOLOv8', 'Label Studio', 'Python', 'MCP', 'Vision model', 'Video streams', 'Tracking'],
    when: 'For our league · 2026', link: '/work/match-vision.html', linkLabel: 'Details',
  },
  {
    cat: 'ai', status: 'Live', title: 'AI Match Previews & Reviews',
    text: 'German match previews and matchday reviews on oekfb.eu. The backend computes the football facts; the model only chooses which verified facts to use, and the backend writes the article.',
    tech: ['Swift', 'Vapor', 'JSON Schema outputs', 'OpenAI-compatible API', 'MongoDB', 'Durable jobs'],
    when: 'ÖKFB', link: '/work/oekfb-federation-platform.html#ai', linkLabel: 'Details',
  },
  {
    cat: 'ai', status: 'Shipped', title: 'Vision AI Card Matching',
    text: 'Matches each of 2 million marketplace listings to the right card out of 400,000, using DINOv2 image embeddings and Qdrant vector search behind a FastAPI service.',
    tech: ['Python', 'FastAPI', 'PyTorch', 'DINOv2', 'Qdrant', 'Docker'],
    when: 'THATSIT! · Nov 2025 – Present', link: '/work/thatsit-vision-matching.html', linkLabel: 'Details',
  },
  {
    cat: 'ai', status: 'Live', title: 'Generated Kit Images',
    text: 'Turns an uploaded jersey into a standardised home or away kit illustration, validates the transparent PNG and shows a preview before it is saved.',
    tech: ['Image generation', 'PNG validation', 'Firebase Storage', 'React', 'Swift'],
    when: 'ÖKFB', link: '/work/oekfb-federation-platform.html#ai', linkLabel: 'Details',
  },
  {
    cat: 'ai', status: 'Exploring', title: 'AI Judge for Card Games',
    text: 'An iPhone camera follows a trading card game, an AI agent checks whether plays are legal, keeps score and talks to the players.',
    tech: ['Vision AI', 'Real-time video', 'Voice', 'Agents', 'iOS'],
    when: 'Personal project', link: '/index.html#beyond', linkLabel: 'More',
  },
  {
    cat: 'full', status: 'Live', title: 'Football League Website',
    text: 'Public site for leagues across Austria: fixtures, live scores, tables, leaderboards, team and player pages, AI previews, transfers, suspensions and search.',
    tech: ['React 18', 'TypeScript', 'Parcel', 'Storybook', 'Swift', 'Vapor'],
    when: 'ÖKFB · Since Nov 2023', link: 'https://www.oekfb.eu/', linkLabel: 'Live site',
  },
  {
    cat: 'full', status: 'Live', title: 'Referee Match Portal',
    text: 'Referees run matches from their phone: match sheets, kick-off to full time, goals and cards, corrections, no-shows and the match report.',
    tech: ['React', 'Material UI', 'Swift', 'Vapor', 'MongoDB'],
    when: 'ÖKFB · Since Nov 2023', link: '/work/oekfb-federation-platform.html#matchday', linkLabel: 'Details',
  },
  {
    cat: 'full', status: 'Live', title: 'Team Self-Service Portal',
    text: 'Teams manage their squad, register players and trainers, upload photos, follow contracts and finances, request transfers and message the office.',
    tech: ['React', 'Material UI', 'Redux', 'Firebase', 'Swift', 'Vapor'],
    when: 'ÖKFB · Since Nov 2023', link: 'https://team.oekfb.eu/', linkLabel: 'Live site',
  },
  {
    cat: 'full', status: 'Live', title: 'Federation Admin Dashboard',
    text: 'Leagues, seasons, fixtures, referees, team applications, discipline, transfers, fees, content, email templates, push notifications and analytics.',
    tech: ['React', 'Ant Design', 'Redux', 'React Quill', 'ApexCharts', 'Swift'],
    when: 'ÖKFB · Since Nov 2023', link: '/work/oekfb-federation-platform.html#platform', linkLabel: 'Details',
  },
  {
    cat: 'full', status: 'In progress', title: 'Goodfield',
    text: 'All-in-one platform for padel, tennis and other sports clubs: a branded public booking site plus a back office for bookings, events, finance and teams.',
    tech: ['Product design', 'Bookings', 'Payments', 'Back office', 'Multi-venue'],
    when: 'Founder · 2026', link: '/index.html#beyond', linkLabel: 'More',
  },
  {
    cat: 'backend', status: 'Live', title: 'Payments & Team Onboarding',
    text: 'Document-based team registration and Stripe payments with verified webhooks, idempotent credits, versioned fees, invoices and recovery after interruptions.',
    tech: ['Swift', 'Vapor', 'Stripe', 'Webhooks', 'Vapor Queues', 'SMTP'],
    when: 'ÖKFB', link: '/work/oekfb-federation-platform.html#payments', linkLabel: 'Details',
  },
  {
    cat: 'backend', status: 'Live', title: 'GA4 Analytics Importer',
    text: 'Native Swift importer for Google Analytics 4 with hourly snapshots, shared leases across replicas, caching and historical and realtime dashboards.',
    tech: ['Swift', 'GA4 APIs', 'MongoDB', 'Leases', 'React'],
    when: 'ÖKFB', link: '/work/oekfb-federation-platform.html#analytics', linkLabel: 'Details',
  },
  {
    cat: 'delivery', status: 'Shipped', title: 'Release Pipeline Rebuild',
    text: 'Rebuilt CI/CD with Jenkins, GitHub workflows and cloned Kubernetes environments, halving deployment time across 28 releases.',
    tech: ['Jenkins', 'GitHub workflows', 'Kubernetes', 'Docker', 'Testing'],
    when: 'adesso · 2022 – 2023', link: '/work/adesso-release-pipeline.html', linkLabel: 'Details',
  },
  {
    cat: 'delivery', status: 'Shipped', title: 'Hotel Self-Check-in',
    text: 'Mobile self-check-in and an IT modernisation for a 200-room hotel, from front-desk analysis to go-live, with around 30% less front-desk effort.',
    tech: ['Self-service flows', 'Server migration', 'Vendor integration'],
    when: 'Bridge · 2025', link: '/work/bridge-hotel-self-checkin.html', linkLabel: 'Details',
  },
  {
    cat: 'mobile', status: 'Shipped', title: 'Losleben iOS App',
    text: 'Native iOS app of the Vienna Insurance Group with around 30,000 users: features, testing, CI/CD and App Store releases.',
    tech: ['Swift', 'iOS', 'Fastlane', 'CI/CD', 'Scrum'],
    when: 'twinformatics · 2020 – 2022', link: '/index.html#experience', linkLabel: 'More',
  },
  {
    cat: 'mobile', status: 'Shipped', title: 'Product Scanner App',
    text: 'Scanner app for capturing products on site, part of a CMS and management system rollout across 12 locations worldwide.',
    tech: ['Barcode scanning', 'Inventory', 'Workflow automation'],
    when: 'Bergner Group · 2012 – 2019', link: '/index.html#experience', linkLabel: 'More',
  },
];

/* ---------- Rendering ---------- */
const MAX_TECH = 4;
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };

function card(p, i) {
  const c = categories[p.cat];
  const a = el('article', 'pj-card');
  a.dataset.cat = p.cat;
  const top = el('div', 'pj-top');
  const cat = el('span', 'pj-cat');
  const dot = el('i', 'pj-dot'); dot.style.setProperty('--c', c.color);
  cat.append(dot, c.label);
  const st = el('span', 'pj-status' + (p.status === 'Live' ? ' is-live' : p.status === 'In progress' ? ' is-progress' : ''), p.status);
  top.append(cat, st);
  const h = el('h3', null, p.title);
  const t = el('p', null, p.text);
  const tech = el('ul', 'pj-tech');
  p.tech.slice(0, MAX_TECH).forEach((x) => tech.appendChild(el('li', null, x)));
  if (p.tech.length > MAX_TECH) { const m = el('li', 'more', '+' + (p.tech.length - MAX_TECH)); m.title = p.tech.slice(MAX_TECH).join(', '); tech.appendChild(m); }
  const foot = el('div', 'pj-foot');
  const link = el('a', null, (p.linkLabel || 'Details') + ' ↗');
  link.href = p.link;
  if (/^https?:/.test(p.link)) { link.target = '_blank'; link.rel = 'noopener'; }
  link.setAttribute('aria-label', `${p.linkLabel || 'Details'}: ${p.title}`);
  foot.append(el('span', null, p.when), link);
  a.append(top, h, t, tech, foot);
  return a;
}

const root = document.getElementById('projects-app');
if (root) {
  const filters = root.querySelector('.pj-filters');
  const track = root.querySelector('.pj-track');
  const cur = root.querySelector('.pj-counter b');
  const total = root.querySelector('.pj-counter .total');
  const bar = root.querySelector('.pj-counter .bar i');
  const [prev, next] = root.querySelectorAll('.pj-nav button');
  const cards = projects.map(card);
  cards.forEach((c) => track.appendChild(c));

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

  const visible = () => cards.filter((c) => !c.hidden);
  function update() {
    const v = visible();
    const step = v.length > 1 ? v[1].offsetLeft - v[0].offsetLeft : 1;
    const idx = Math.min(v.length - 1, Math.round(track.scrollLeft / step));
    cur.textContent = String(v.length ? idx + 1 : 0).padStart(2, '0');
    total.textContent = String(v.length).padStart(2, '0');
    bar.style.width = (v.length ? ((idx + 1) / v.length) * 100 : 0) + '%';
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  }
  filters.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    filters.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    cards.forEach((c) => { c.hidden = b.dataset.f !== 'all' && c.dataset.cat !== b.dataset.f; });
    track.scrollTo({ left: 0 }); update();
  });
  const by = (dir) => { const v = visible(); const step = v.length > 1 ? v[1].offsetLeft - v[0].offsetLeft : track.clientWidth; track.scrollBy({ left: dir * step, behavior: 'smooth' }); };
  prev.addEventListener('click', () => by(-1));
  next.addEventListener('click', () => by(1));
  track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  addEventListener('resize', update);
  update();
}
