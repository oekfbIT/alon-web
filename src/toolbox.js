/* =========================================================
   Toolbox: skill cloud + strongest skills.
   level: 3 = daily / strongest, 2 = solid, 1 = used in projects.
   since: the year I started using it professionally (leave out if unsure).
   ========================================================= */
export const groups = {
  backend: { label: 'Backend', color: '#4f6bd8' },
  ai: { label: 'AI & ML', color: '#0f9488' },
  front: { label: 'Frontend & Mobile', color: '#a3489b' },
  data: { label: 'Data & Integrations', color: '#c2410c' },
  ops: { label: 'Cloud & DevOps', color: '#64748b' },
  core: { label: 'Engineering & Product', color: '#be185d' },
};

export const skills = [
  { name: 'Swift', g: 'backend', level: 3, since: 2020, strong: true },
  { name: 'Python', g: 'backend', level: 3, strong: true },
  { name: 'TypeScript', g: 'front', level: 3, since: 2022, strong: true },
  { name: 'React', g: 'front', level: 3, since: 2022, strong: true },
  { name: 'Vapor', g: 'backend', level: 3, since: 2023, strong: true },
  { name: 'FastAPI', g: 'backend', level: 2, since: 2025 },
  { name: 'REST APIs', g: 'backend', level: 3 },
  { name: 'Background jobs', g: 'backend', level: 2 },
  { name: 'LLM applications', g: 'ai', level: 3, since: 2025, strong: true },
  { name: 'Structured outputs', g: 'ai', level: 2 },
  { name: 'PyTorch', g: 'ai', level: 2, since: 2025 },
  { name: 'Transformers', g: 'ai', level: 2 },
  { name: 'DINOv2 embeddings', g: 'ai', level: 2 },
  { name: 'Vector search', g: 'ai', level: 2 },
  { name: 'YOLOv8', g: 'ai', level: 2, since: 2026 },
  { name: 'Label Studio', g: 'ai', level: 1 },
  { name: 'MCP', g: 'ai', level: 2 },
  { name: 'Computer vision', g: 'ai', level: 2 },
  { name: 'RAG', g: 'ai', level: 1 },
  { name: 'Image generation', g: 'ai', level: 1 },
  { name: 'React Native', g: 'front', level: 2, since: 2025 },
  { name: 'iOS', g: 'front', level: 3, since: 2020, strong: true },
  { name: 'Redux', g: 'front', level: 2 },
  { name: 'Vite', g: 'front', level: 2 },
  { name: 'Tailwind CSS', g: 'front', level: 2 },
  { name: 'Material UI', g: 'front', level: 1 },
  { name: 'Ant Design', g: 'front', level: 1 },
  { name: 'MongoDB', g: 'data', level: 3, since: 2023 },
  { name: 'PostgreSQL', g: 'data', level: 2 },
  { name: 'Qdrant', g: 'data', level: 2 },
  { name: 'Stripe', g: 'data', level: 3, since: 2023, strong: true },
  { name: 'Firebase', g: 'data', level: 2 },
  { name: 'Google Analytics 4', g: 'data', level: 1 },
  { name: 'Docker', g: 'ops', level: 3, since: 2022, strong: true },
  { name: 'Kubernetes', g: 'ops', level: 2, since: 2022 },
  { name: 'CI/CD', g: 'ops', level: 3, since: 2020, strong: true },
  { name: 'Jenkins', g: 'ops', level: 2 },
  { name: 'GitHub workflows', g: 'ops', level: 2 },
  { name: 'Fastlane', g: 'ops', level: 2 },
  { name: 'DigitalOcean', g: 'ops', level: 1 },
  { name: 'Azure', g: 'ops', level: 1 },
  { name: 'AWS', g: 'ops', level: 1 },
  { name: 'Testing', g: 'core', level: 3 },
  { name: 'Code review', g: 'core', level: 3 },
  { name: 'System design', g: 'core', level: 3, strong: true },
  { name: 'Release management', g: 'core', level: 2 },
  { name: 'Scrum & Kanban', g: 'core', level: 2 },
  { name: 'Claude Code', g: 'core', level: 2 },
  { name: 'Mentoring', g: 'core', level: 1 },
];

/* ---------- Rendering ---------- */
const NOW = 2026;
const mk = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; };
const root = document.getElementById('toolbox-app');
if (root) {
  const cloud = root.querySelector('.tb-cloud');
  const legend = root.querySelector('.tb-legend');
  const strong = root.querySelector('.tb-strong');
  // interleave groups so colours spread across the cloud, strongest towards the middle
  const order = [...skills].sort((a, b) => b.level - a.level);
  const mid = [];
  order.forEach((s, i) => (i % 2 ? mid.push(s) : mid.unshift(s)));
  mid.forEach((s, i) => {
    const li = mk('li', `tb-skill lv${s.level}`, s.name);
    li.dataset.g = s.g;
    li.style.setProperty('--c', groups[s.g].color);
    li.style.setProperty('--d', `${(i % 7) * 0.4}s`);
    cloud.appendChild(li);
  });
  Object.entries(groups).forEach(([k, g]) => {
    const b = mk('button'); b.type = 'button'; b.dataset.g = k; b.setAttribute('aria-pressed', 'false');
    const d = mk('i', 'pj-dot'); d.style.setProperty('--c', g.color);
    b.append(d, g.label);
    legend.appendChild(b);
  });
  legend.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    const on = b.getAttribute('aria-pressed') !== 'true';
    legend.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(on && x === b)));
    cloud.dataset.focus = on ? b.dataset.g : '';
    cloud.querySelectorAll('.tb-skill').forEach((s) => s.classList.toggle('is-dim', on && s.dataset.g !== b.dataset.g));
  });
  skills.filter((s) => s.strong).forEach((s) => {
    const li = mk('li');
    li.append(mk('span', null, s.name));
    if (s.since) { const y = mk('small', null, `${NOW - s.since}y`); y.title = `since ${s.since}`; li.append(y); }
    strong.appendChild(li);
  });
}
