/* =========================================================
   Toolbox: skill cloud + strongest skills.
   level: 3 = daily / strongest, 2 = solid, 1 = used in projects.
   since: the year I started using it professionally (leave out if unsure).
   ========================================================= */
export const groups = {
  backend: { label: 'Backend', color: '#4f6bd8' },
  ai: { label: 'AI & ML', color: '#6b5fc7' },
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

/* ---------- Rendering: one row per area ---------- */
const NOW = new Date().getFullYear();
const mk = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; };
const list = document.querySelector('#toolbox-app .sk-list');
if (list) {
  Object.entries(groups).forEach(([k, g]) => {
    const items = skills.filter((s) => s.g === k).sort((a, b) => b.level - a.level);
    if (!items.length) return;
    const dd = mk('dd'); const ul = mk('ul', 'sk-items');
    items.forEach((s) => {
      const li = mk('li', s.strong ? 'is-strong' : null, s.name);
      if (s.strong && s.since) { const y = mk('small', null, `${NOW - s.since}y`); y.title = `since ${s.since}`; li.append(y); }
      ul.append(li);
    });
    dd.append(ul);
    list.append(mk('dt', null, g.label), dd);
  });
}
