/* Full-page "Interview me" chat (chat.html). Uses ask() from ask.js; résumé sidebar comes from roles.js.
   Open with ?q=… to start with a question. */
import { ask, typeInto } from './ask.js';
import { roles, roleUrl, logoUrl } from './roles.js';

const $ = (id) => document.getElementById(id);
const log = $('cp-log'), empty = $('cp-empty'), form = $('cp-form'), input = $('composer-input');
const sendBtn = form.querySelector('button');
const history = [];
const asked = new Set();
let busy = false;

/* ---------- Questions: starters and follow-ups ---------- */
const STARTERS = [
  { label: 'Introduction', q: 'Tell me about yourself.' },
  { label: 'AI', q: 'What AI have you shipped to production?' },
  { label: 'Reliability', q: 'How do you stop an LLM from hallucinating?' },
  { label: 'Biggest project', q: 'Walk me through the football federation platform.' },
  { label: 'Leadership', q: 'What’s your leadership experience?' },
  { label: 'Availability', q: 'When can you start, and what role are you looking for?' },
];
// Follow-ups are picked by overlap with the last answer, so they stay on topic.
const FOLLOWUPS = [
  ['Why do you want to move into AI engineering?', 'ai career move engineering'],
  ['Walk me through the AI match preview system.', 'preview match llm structured facts football'],
  ['How do you make AI pipelines reliable?', 'jobs retries leases idempotency pipeline reliable'],
  ['How do you control AI costs?', 'cost budget token running'],
  ['Why did you frame card matching as search, not classification?', 'thatsit card matching dinov2 qdrant embeddings listings'],
  ['How do you turn a model into a production service?', 'model service fastapi api deployed container'],
  ['What are you building right now?', 'match analysis yolov8 video label studio mcp vision'],
  ['How would you identify players in match video?', 'video players identity squad yolov8 tracking'],
  ['What is MCP and how have you used it?', 'mcp model context protocol tools'],
  ['How did you build payments with Stripe?', 'stripe payments balance webhooks fees invoices'],
  ['Explain idempotency and where you’ve used it.', 'idempotency idempotent retries double credits'],
  ['How does live scoring work on match day?', 'referee live scoring sunday match matches'],
  ['Tell me about the release pipeline you rebuilt.', 'adesso release pipeline jenkins kubernetes deployment'],
  ['How do you approach testing?', 'testing tests coverage quality reviews'],
  ['Tell me about the hotel self-check-in project.', 'bridge hotel check-in front-desk partners migration'],
  ['How do you work with non-technical stakeholders?', 'management stakeholders board workshops partners decision'],
  ['Tell me about mentoring.', 'mentored junior apprentices twinformatics'],
  ['How does your design background shape your work?', 'design industrial person'],
  ['Who are your co-founders at THATSIT!?', 'thatsit co-founder team founders marketplace'],
  ['What’s your mobile experience?', 'ios app swift react native losleben mobile'],
  ['What would previous employers say about you?', 'reference employers expertise initiative'],
  ['What makes you different from other candidates?', 'different hire unique ownership'],
  ['What is your stack?', 'stack languages swift python typescript'],
  ['How can I contact you?', 'contact email linkedin start available'],
];
const words = (s) => new Set(s.toLowerCase().match(/[a-zäöüß0-9-]{3,}/g) || []);

function followUps(answer, q) {
  const w = words(answer + ' ' + q);
  return FOLLOWUPS.filter(([f]) => !asked.has(f))
    .map(([f, tags]) => [f, [...words(tags)].filter((t) => w.has(t)).length + Math.random() * 0.5])
    .sort((a, b) => b[1] - a[1]).slice(0, 3).map(([f]) => f);
}

function chips(list, cls) {
  const box = document.createElement('div'); box.className = cls;
  list.forEach((q) => {
    const b = document.createElement('button'); b.type = 'button'; b.textContent = q;
    b.addEventListener('click', () => run(q));
    box.append(b);
  });
  return box;
}

/* ---------- Starters ---------- */
const starters = $('cp-starters');
STARTERS.forEach(({ label, q }) => {
  const b = document.createElement('button'); b.type = 'button'; b.className = 'cp-starter';
  b.innerHTML = '<span></span><strong></strong>';
  b.querySelector('span').textContent = label; b.querySelector('strong').textContent = q;
  b.addEventListener('click', () => run(q));
  starters.append(b);
});

/* ---------- Résumé sidebar ---------- */
const list = $('cp-roles');
roles.forEach((r) => {
  const li = document.createElement('li');
  li.innerHTML = `<a href="${roleUrl(r.id)}"><span class="cp-logo" data-mono="${r.mono}"><img src="${logoUrl(r.id)}" alt="" width="32" height="32" loading="lazy"></span><span class="cp-r"><strong></strong><em></em><small></small></span></a>`;
  li.querySelector('img').addEventListener('error', (e) => e.target.parentNode.classList.add('no-logo'));
  li.querySelector('strong').textContent = r.short;
  li.querySelector('em').textContent = r.title;
  li.querySelector('small').textContent = r.dates;
  list.append(li);
});

/* ---------- Conversation ---------- */
function avatar() {
  const f = document.createElement('figure'); f.className = 'cp-avatar cp-avatar-sm';
  f.innerHTML = '<img src="/alon-portrait.jpg" alt="" width="32" height="32"><span aria-hidden="true">AY</span>';
  f.querySelector('img').addEventListener('error', () => f.classList.add('no-photo'));
  return f;
}

async function run(q) {
  q = q.trim(); if (!q || busy) return;
  busy = true; sendBtn.disabled = true; asked.add(q);
  empty.hidden = true;
  log.querySelectorAll('.cp-next').forEach((n) => n.remove());

  const you = document.createElement('div'); you.className = 'cp-msg cp-you'; you.textContent = q;
  const me = document.createElement('div'); me.className = 'cp-msg cp-alon is-thinking';
  const body = document.createElement('div'); body.className = 'cp-body';
  const text = document.createElement('p'); text.className = 'cp-text';
  text.innerHTML = '<span class="cp-dots" aria-label="Thinking"><i></i><i></i><i></i></span>';
  body.append(text); me.append(avatar(), body);
  log.append(you, me); log.scrollTop = 1e6;

  const res = await ask(q, history);
  history.push({ role: 'user', content: q }, { role: 'assistant', content: res.answer });
  me.classList.remove('is-thinking');
  await typeInto(text, res.answer, log);

  if (res.sources && res.sources.length) {
    const src = document.createElement('div'); src.className = 'cp-src';
    const lbl = document.createElement('span'); lbl.textContent = res.mode === 'model' ? 'Sources' : 'From my notes';
    src.append(lbl);
    res.sources.forEach((s) => { const l = document.createElement('a'); l.href = s.url; l.textContent = s.title; src.append(l); });
    body.append(src);
  }
  const next = followUps(res.answer, q);
  if (next.length) {
    const wrap = document.createElement('div'); wrap.className = 'cp-next';
    const h = document.createElement('p'); h.textContent = 'You could ask next';
    wrap.append(h, chips(next, 'cp-chips'));
    log.append(wrap);
  }
  log.scrollTop = 1e6;
  busy = false; sendBtn.disabled = false; input.focus();
}

function reset() {
  if (busy) return;
  history.length = 0; asked.clear();
  log.querySelectorAll('.cp-msg, .cp-next').forEach((n) => n.remove());
  empty.hidden = false; input.value = ''; grow(); input.focus();
  closeSide();
}

/* ---------- Composer ---------- */
function grow() { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 180) + 'px'; }
input.addEventListener('input', grow);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); form.requestSubmit(); }
});
form.addEventListener('submit', (e) => { e.preventDefault(); const q = input.value; input.value = ''; grow(); run(q); });
$('cp-new').addEventListener('click', reset);

/* ---------- Sidebar on small screens ---------- */
const side = $('cp-side'), scrim = $('cp-scrim'), menu = $('cp-menu');
function closeSide() { side.classList.remove('open'); scrim.hidden = true; menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => { const open = side.classList.toggle('open'); scrim.hidden = !open; menu.setAttribute('aria-expanded', String(open)); });
scrim.addEventListener('click', closeSide);
addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSide(); });

/* ---------- Theme (same behaviour as the rest of the site) ---------- */
const rootEl = document.documentElement;
document.querySelector('.theme-btn').addEventListener('click', () => {
  const dark = rootEl.getAttribute('data-theme') === 'dark' || (!rootEl.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
  const next = dark ? 'light' : 'dark';
  rootEl.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
});

/* ---------- Start from ?q= ---------- */
const start = new URLSearchParams(location.search).get('q');
if (start) run(start); else input.focus({ preventScroll: true });
