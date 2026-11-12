/* Experience: one quiet line under each role naming what was built there.
   Data comes from src/projects-data.js (org = role id). The full project list lives in the Projects section. */
import { projects, projectUrl } from './projects-data.js';

const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; };
const MAX = 4;

const list = document.querySelector('.xp-list');
if (list) {
  list.querySelectorAll('li').forEach((li) => {
    const row = li.querySelector('a.xp-row'); if (!row) return;
    const href = row.getAttribute('href');
    const id = (href.match(/experience\/([a-z0-9-]+)\.html/) || [])[1];
    const items = projects.filter((p) => p.org === id);
    if (!items.length) return;
    const line = el('p', 'xp-built');
    line.append(el('span', 'xp-built-label', 'Built'));
    items.slice(0, MAX).forEach((p, i) => {
      if (i) line.append(el('span', 'xp-sep', '·'));
      const a = el('a', null, p.title); a.href = projectUrl(p);
      line.append(a);
    });
    if (items.length > MAX) {
      line.append(el('span', 'xp-sep', '·'));
      const more = el('a', 'xp-more', `+${items.length - MAX} more`); more.href = href;
      line.append(more);
    }
    li.append(line);
  });
}
