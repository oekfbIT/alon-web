/* Full-page "Interview me" chat (chat.html). Uses ask() from ask.js; résumé sidebar comes from roles.js.
   Open with ?q=… to start with a question. */
import './i18n.js';
import { ask, typeInto } from './ask.js';
import { isGerman } from './kb.js';
import { roles, roleUrl, logoUrl } from './roles.js';

const $ = (id) => document.getElementById(id);
const log = $('cp-log'), empty = $('cp-empty'), form = $('cp-form'), input = $('composer-input');
const sendBtn = form.querySelector('button');
const history = [];
const asked = new Set();
let busy = false;

/* ---------- Questions: starters and follow-ups (English and German) ---------- */
const isDe = () => document.documentElement.lang === 'de';
const T = {
  sources: ['Sources', 'Quellen'], notes: ['From my notes', 'Aus meinen Notizen'], next: ['You could ask next', 'Du könntest als Nächstes fragen'],
};
const t = (k, de = isDe()) => T[k][de ? 1 : 0];
const STARTERS = [
  { label: ['Introduction', 'Vorstellung'], q: ['Tell me about yourself.', 'Erzähl mir von dir.'] },
  { label: ['Role fit', 'Passung'], q: ['Why are you a good fit for a Digital Product Engineer role?', 'Warum passt du gut zu einer Rolle als Digital Product Engineer?'] },
  { label: ['AI', 'KI'], q: ['What AI have you shipped to production?', 'Welche KI hast du in Produktion gebracht?'] },
  { label: ['Biggest project', 'Größtes Projekt'], q: ['Walk me through the football federation platform.', 'Erzähl mir von der Plattform des Fußballverbands.'] },
  { label: ['Banking', 'Banking'], q: ['What experience do you have with banking and payments?', 'Welche Erfahrung hast du mit Banken und Zahlungen?'] },
  { label: ['Availability', 'Verfügbarkeit'], q: ['When can you start, and what role are you looking for?', 'Wann kannst du anfangen, und welche Rolle suchst du?'] },
];
// Follow-ups are picked by overlap with the last answer, so they stay on topic. [English, German, keywords in both]
const FOLLOWUPS = [
  ['Why do you want to move into AI engineering?', 'Warum willst du ins KI-Engineering wechseln?', 'ai ki career karriere engineering'],
  ['Walk me through the AI match preview system.', 'Wie funktionieren die KI-Spielvorschauen?', 'preview vorschau spielvorschauen match spiel llm structured fakten facts football fußball'],
  ['How do you make AI pipelines reliable?', 'Wie machst du KI-Pipelines zuverlässig?', 'jobs retries leases idempotency pipeline reliable robuste zuverlässig'],
  ['How do you stop an LLM from hallucinating?', 'Wie verhinderst du, dass ein LLM halluziniert?', 'llm hallucinating halluziniert erfinden fakten facts grounded'],
  ['How do you turn a model into a production service?', 'Wie machst du aus einem Modell einen Produktionsservice?', 'model modell service fastapi api deployed container vision'],
  ['What are you building right now?', 'Woran baust du gerade?', 'match analysis spielanalyse yolov8 video label studio mcp vision'],
  ['What is MCP and how have you used it?', 'Was ist MCP und wie hast du es genutzt?', 'mcp model context protocol tools werkzeuge'],
  ['How did you build payments with Stripe?', 'Wie hast du Zahlungen mit Stripe gebaut?', 'stripe payments zahlungen balance guthaben webhooks fees gebühren invoices'],
  ['What experience do you have with banking?', 'Welche Erfahrung hast du im Bankenumfeld?', 'bank banking deutsche insurance versicherung payments zahlungen regulated'],
  ['How does live scoring work on match day?', 'Wie funktioniert das Live-Scoring am Spieltag?', 'referee schiedsrichter live scoring sunday sonntag match spiele'],
  ['How do you handle incidents in production?', 'Wie gehst du mit Vorfällen in Produktion um?', 'production produktion incident vorfall reliable zuverlässig jobs retries betrieb'],
  ['How do you turn business needs into requirements?', 'Wie übersetzt du Business-Anforderungen in Lösungen?', 'requirements anforderungen stakeholders stakeholder specification spezifikation product owner'],
  ['Tell me about the release pipeline you rebuilt.', 'Erzähl mir von der Release-Pipeline, die du neu gebaut hast.', 'adesso release pipeline jenkins kubernetes deployment'],
  ['How do you approach testing?', 'Wie gehst du an Testing heran?', 'testing tests coverage testabdeckung quality qualität reviews'],
  ['Tell me about the hotel self-check-in project.', 'Erzähl mir vom Hotel-Self-Check-in.', 'bridge hotel check-in front-desk rezeption migration'],
  ['What’s your leadership experience?', 'Welche Führungserfahrung hast du?', 'lead leadership führung team mentored betreut product owner board vorstand'],
  ['How do you use AI in your own development work?', 'Wie nutzt du KI bei deiner eigenen Entwicklung?', 'claude code agentic agentisch ai-assisted tools werkzeuge'],
  ['What’s your mobile experience?', 'Welche Mobile-Erfahrung hast du?', 'ios app swift react native losleben mobile'],
  ['What would previous employers say about you?', 'Was sagen frühere Arbeitgeber über dich?', 'reference referenzen employers arbeitgeber expertise'],
  ['What is your stack?', 'Was ist dein Tech-Stack?', 'stack languages sprachen swift python typescript react'],
  ['How can I contact you?', 'Wie erreiche ich dich?', 'contact kontakt email linkedin start available verfügbar'],
];
const words = (s) => new Set(s.toLowerCase().match(/[a-zäöüß0-9-]{3,}/g) || []);

function followUps(answer, q, de) {
  const w = words(answer + ' ' + q);
  return FOLLOWUPS.filter(([en, d]) => !asked.has(en) && !asked.has(d))
    .map(([en, d, tags]) => [de ? d : en, [...words(tags)].filter((x) => w.has(x)).length + Math.random() * 0.5])
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
starters.setAttribute('data-no-i18n', '');
function renderStarters() {
  const k = isDe() ? 1 : 0;
  starters.replaceChildren();
  STARTERS.forEach(({ label, q }) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'cp-starter';
    b.innerHTML = '<span></span><strong></strong>';
    b.querySelector('span').textContent = label[k]; b.querySelector('strong').textContent = q[k];
    b.addEventListener('click', () => run(q[k]));
    starters.append(b);
  });
}
function renderLang() { renderStarters(); input.placeholder = isDe() ? 'Frag mich alles über meine Arbeit…' : 'Ask me anything about my work…'; }
renderLang();
document.addEventListener('change', (e) => { if (e.target.closest('.lang-select')) setTimeout(renderLang); });

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

  const you = document.createElement('div'); you.className = 'cp-msg cp-you'; you.setAttribute('data-no-i18n', ''); you.textContent = q;
  const me = document.createElement('div'); me.className = 'cp-msg cp-alon is-thinking'; me.setAttribute('data-no-i18n', '');
  const body = document.createElement('div'); body.className = 'cp-body';
  const text = document.createElement('p'); text.className = 'cp-text';
  text.innerHTML = '<span class="cp-dots" aria-label="Thinking"><i></i><i></i><i></i></span>';
  body.append(text); me.append(avatar(), body);
  log.append(you, me); log.scrollTop = 1e6;

  const de = isGerman(q) || isDe();
  const res = await ask(q, history);
  history.push({ role: 'user', content: q }, { role: 'assistant', content: res.answer });
  me.classList.remove('is-thinking');
  await typeInto(text, res.answer, log);

  if (res.sources && res.sources.length) {
    const src = document.createElement('div'); src.className = 'cp-src';
    const lbl = document.createElement('span'); lbl.textContent = res.mode === 'model' ? t('sources', de) : t('notes', de);
    src.append(lbl);
    res.sources.forEach((s) => { const l = document.createElement('a'); l.href = s.url; l.textContent = s.title; src.append(l); });
    body.append(src);
  }
  const next = followUps(res.answer, q, de);
  if (next.length) {
    const wrap = document.createElement('div'); wrap.className = 'cp-next'; wrap.setAttribute('data-no-i18n', '');
    const h = document.createElement('p'); h.textContent = t('next', de);
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
