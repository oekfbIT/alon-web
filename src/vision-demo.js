/* Concept preview of the match-analysis app on /work/match-vision.html (sample data). */
const root = document.getElementById('mv-demo');
if (root) {
  const DUR = 54 * 60 + 32;
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const evs = [...root.querySelectorAll('.mv-ev')];
  const ticks = [...root.querySelectorAll('.mv-tick')];
  const boxes = [...root.querySelectorAll('.mv-box')];
  const clock = root.querySelector('.mv-clock');
  const time = root.querySelector('.mv-time b');
  const prog = root.querySelector('.mv-progress');
  const goals = root.querySelector('.mv-goals');

  function focusPlayer(id) {
    boxes.forEach((b) => b.classList.toggle('is-focus', !!id && b.dataset.player === id));
    root.querySelectorAll('.mv-jersey').forEach((j) => j.classList.toggle('is-on', !!id && j.dataset.player === id));
  }
  function jump(i) {
    const e = evs[i]; if (!e) return;
    const t = +e.dataset.t;
    clock.textContent = time.textContent = fmt(t);
    prog.style.width = (t / DUR) * 100 + '%';
    // score so far from goal events before t
    let h = 0, a = 0;
    evs.forEach((x) => { if (x.dataset.kind === 'goal' && +x.dataset.t <= t) (x.dataset.player.startsWith('home') ? h++ : a++); });
    goals.textContent = `${h} – ${a}`;
    evs.forEach((x, k) => x.setAttribute('aria-current', String(k === i)));
    ticks.forEach((x, k) => x.classList.toggle('is-on', k === i));
    focusPlayer(e.dataset.player);
  }
  evs.forEach((e, i) => e.addEventListener('click', () => jump(i)));
  ticks.forEach((t, i) => t.addEventListener('click', () => { jump(i); evs[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }));

  root.querySelectorAll('.mv-jerseys .mv-jersey').forEach((j) => j.addEventListener('click', () => {
    const on = !j.classList.contains('is-on');
    focusPlayer(on ? j.dataset.player : null);
    evs.forEach((e) => { e.parentElement.hidden = on && e.dataset.player !== j.dataset.player; });
  }));

  root.querySelectorAll('.mv-filters button').forEach((b) => b.addEventListener('click', () => {
    root.querySelectorAll('.mv-filters button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    evs.forEach((e) => { e.parentElement.hidden = b.dataset.f !== 'all' && e.dataset.kind !== b.dataset.f; });
  }));

  root.querySelectorAll('.mv-tabs [role="tab"]').forEach((t) => t.addEventListener('click', () => {
    root.querySelectorAll('.mv-tabs [role="tab"]').forEach((x) => x.setAttribute('aria-selected', String(x === t)));
    root.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== t.dataset.tab; });
    root.querySelector('.mv-filters').hidden = t.dataset.tab !== 'events';
  }));

  root.querySelector('.mv-toggle input').addEventListener('change', (e) => root.classList.toggle('no-boxes', !e.target.checked));
  jump(4);
}
