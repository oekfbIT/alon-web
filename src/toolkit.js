/* =========================================================
   Engineering Toolkit
   Edit the data below to add, remove or reorder skills.
   - Icons live in src/icons.js (brand logos from Simple Icons, conceptual icons from Lucide).
   - Azure and AWS have no logo in Simple Icons, so they use a neutral cloud icon.
   - featured: true gives a category the slightly stronger highlight.
   ========================================================= */
import {
  siPython, siFastapi, siPytorch, siHuggingface, siQdrant, siTypescript, siReact, siSwift, siVite, siTailwindcss,
  siDocker, siKubernetes, siVapor, siStripe, siFirebase, siGoogleanalytics, siExpo, siDigitalocean, siJenkins, siGithubactions, siFastlane, siPostgresql, siMongodb, siVitest, siJira, siConfluence, siClaude,
  Brackets, ScanSearch, Sparkles, BellRing, Smartphone, Cloud, Rocket, ShieldCheck, TriangleAlert, FileCode, Users, ListOrdered, GraduationCap, Workflow,
} from './icons.js';

/* A brand skill: { label, brand: siX }. A conceptual skill: { label, icon: LucideIcon }. */
export const skillCategories = [
  {
    title: 'Backend & AI',
    featured: true,
    skills: [
      { label: 'Swift & Vapor', brand: siVapor },
      { label: 'Python', brand: siPython },
      { label: 'FastAPI', brand: siFastapi },
      { label: 'PyTorch', brand: siPytorch },
      { label: 'Transformers', brand: siHuggingface },
      { label: 'DINOv2 Embeddings', icon: ScanSearch },
      { label: 'Qdrant', brand: siQdrant },
      { label: 'Structured AI Outputs', icon: Sparkles },
      { label: 'REST APIs', icon: Brackets },
    ],
  },
  {
    title: 'Frontend & Mobile',
    featured: true,
    skills: [
      { label: 'TypeScript', brand: siTypescript },
      { label: 'React', brand: siReact },
      { label: 'React Native', icon: Smartphone },
      { label: 'Swift / iOS', brand: siSwift },
      { label: 'Vite', brand: siVite },
      { label: 'Tailwind CSS', brand: siTailwindcss },
    ],
  },
  {
    title: 'Infrastructure & Delivery',
    featured: true,
    skills: [
      { label: 'Docker', brand: siDocker },
      { label: 'Kubernetes', brand: siKubernetes },
      { label: 'Jenkins', brand: siJenkins },
      { label: 'GitHub Workflows', brand: siGithubactions },
      { label: 'Fastlane', brand: siFastlane },
      { label: 'DigitalOcean', brand: siDigitalocean },
      { label: 'Microsoft Azure', icon: Cloud },
      { label: 'AWS', icon: Cloud },
      { label: 'Release Planning', icon: Rocket },
    ],
  },
  {
    title: 'Payments & Integrations',
    skills: [
      { label: 'Stripe', brand: siStripe },
      { label: 'Firebase', brand: siFirebase },
      { label: 'Google Analytics 4', brand: siGoogleanalytics },
      { label: 'Expo Push', brand: siExpo },
      { label: 'Push Notifications', icon: BellRing },
      { label: 'Process Automation', icon: Workflow },
    ],
  },
  {
    title: 'Data & Quality',
    skills: [
      { label: 'PostgreSQL', brand: siPostgresql },
      { label: 'MongoDB', brand: siMongodb },
      { label: 'Vitest', brand: siVitest },
      { label: '70%+ Test Coverage', icon: ShieldCheck },
      { label: 'Code Review', icon: FileCode },
      { label: 'Incident Analysis', icon: TriangleAlert },
    ],
  },
  {
    title: 'Ways of Working',
    skills: [
      { label: 'Claude Code', brand: siClaude },
      { label: 'Jira', brand: siJira },
      { label: 'Confluence', brand: siConfluence },
      { label: 'Scrum & Kanban', icon: ListOrdered },
      { label: 'Requirements Workshops', icon: Users },
      { label: 'Mentoring', icon: GraduationCap },
    ],
  },
];

/* Smaller tools, shown as a quiet line under the cards (leave empty to hide the line) */
export const alsoUsed = [];

/* ---------- Rendering ---------- */
const SVG_NS = 'http://www.w3.org/2000/svg';
const TILE_BG = [20, 30, 48]; // matches --tk-tile in style.css

// Brand colours are kept only when they stay readable on the dark tile.
function readableBrandColor(hex) {
  const rgb = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const lum = (c) => {
    const s = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
    return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
  };
  const [a, b] = [lum(rgb), lum(TILE_BG)];
  const contrast = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  return contrast >= 3 ? `#${hex}` : null;
}

function lineIcon(nodes) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  const attrs = { viewBox: '0 0 24 24', width: 18, height: 18, fill: 'none', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' };
  Object.entries(attrs).forEach(([k, v]) => svg.setAttribute(k, v));
  nodes.forEach(([tag, a]) => {
    const el = document.createElementNS(SVG_NS, tag);
    Object.entries(a).forEach(([k, v]) => el.setAttribute(k, v));
    svg.appendChild(el);
  });
  return svg;
}

function brandIcon(si) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', si.path);
  svg.appendChild(path);
  svg.style.fill = readableBrandColor(si.hex) || 'var(--tk-text)';
  return svg;
}

export function SkillTile({ label, icon, brand }) {
  const li = document.createElement('li');
  li.className = 'tk-tile';
  const wrap = document.createElement('span');
  wrap.className = 'tk-icon' + (brand ? ' is-brand' : '');
  wrap.appendChild(brand ? brandIcon(brand) : lineIcon(icon));
  const text = document.createElement('span');
  text.className = 'tk-label';
  text.textContent = label;
  li.append(wrap, text);
  return li;
}

export function SkillCategory({ title, skills, featured }) {
  const card = document.createElement('section');
  card.className = 'tk-card' + (featured ? ' is-featured' : '');
  card.setAttribute('aria-label', title);
  const h = document.createElement('h3');
  h.textContent = title;
  const list = document.createElement('ul');
  list.className = 'tk-tiles';
  skills.forEach((s) => list.appendChild(SkillTile(s)));
  card.append(h, list);
  return card;
}

const grid = document.getElementById('toolkit-grid');
if (grid) {
  skillCategories.forEach((c) => grid.appendChild(SkillCategory(c)));
  if (alsoUsed.length) {
    const p = document.createElement('p');
    p.className = 'tk-also';
    p.textContent = 'Also worked with: ' + alsoUsed.join(', ');
    grid.after(p);
  }
}
