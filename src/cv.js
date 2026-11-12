/* Company logos: try /logos/<id>.svg, then .png, then .webp; fall back to the monogram */
const LOGO_EXT = ['png', 'svg', 'webp'];
document.querySelectorAll('.logo img').forEach((img) => {
  let k = 0;
  const fail = () => {
    k += 1;
    if (k < LOGO_EXT.length) img.src = img.src.replace(/\.\w+$/, '.' + LOGO_EXT[k]);
    else img.remove();
  };
  img.addEventListener('error', fail);
  if (img.complete && img.naturalWidth === 0) fail();
});

/* Résumé timeline tabs + active section in the header nav */
const tabs = [...document.querySelectorAll('.g-row[role="tab"]')];
function select(t, focus) {
  tabs.forEach((x) => {
    const on = x === t;
    x.setAttribute('aria-selected', String(on));
    x.tabIndex = on ? 0 : -1;
    document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
  });
  if (focus) t.focus();
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => select(t));
  t.addEventListener('keydown', (e) => {
    const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
  });
});

/* Scrollspy: mark the nav link of the section in view */
const links = [...document.querySelectorAll('.nav a[href*="#"]')];
const byId = Object.fromEntries(links.map((a) => [a.hash.slice(1), a]));
const secs = Object.keys(byId).map((id) => document.getElementById(id)).filter(Boolean);
if (secs.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { links.forEach((a) => a.removeAttribute('aria-current')); byId[en.target.id].setAttribute('aria-current', 'true'); }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach((s) => io.observe(s));
}

/* Résumé panels: list what was built in each role, linking to the details */
import { projects } from './projects-data.js';
document.querySelectorAll('.role-built[data-org]').forEach((box) => {
  const items = projects.filter((p) => p.org === box.dataset.org && p.link !== `/experience/${box.dataset.org}.html`);
  if (!items.length) { box.remove(); return; }
  const h = document.createElement('h4'); h.textContent = `Built here · ${items.length}`;
  const ul = document.createElement('ul');
  items.forEach((p) => {
    const li = document.createElement('li'); const a = document.createElement('a');
    a.href = p.link; a.textContent = p.title;
    if (/^https?:/.test(p.link)) { a.target = '_blank'; a.rel = 'noopener'; }
    li.append(a); ul.append(li);
  });
  box.append(h, ul);
});

/* Role pages: switch the laptop screenshot */
document.querySelectorAll('.device-stage').forEach((stage) => {
  const img = stage.querySelector('.laptop img');
  const btns = stage.querySelectorAll('.device-tabs button');
  btns.forEach((b) => b.addEventListener('click', () => {
    btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    img.src = b.dataset.src; img.alt = b.dataset.alt;
    const bar = stage.querySelector('.laptop-bar span'); if (bar && b.dataset.url) bar.textContent = b.dataset.url;
  }));
});
