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
