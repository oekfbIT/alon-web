/* "Ask me" chat: retrieval over src/knowledge.js, answered by /api/ask when a model is configured,
   otherwise answered directly from the best-matching passages. */
import { knowledge } from './knowledge.js';
import { createRetriever } from './retrieve.js';

const search = createRetriever(knowledge);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function localAnswer(q) {
  const found = search(q, 3);
  if (!found.length) {
    return { answer: 'I don’t have an answer to that here. Try asking about my stack, my AI work, the football platform or when I can start, or email me at alon.yakoby@gmail.com.', sources: [{ title: 'Contact', url: '/#contact' }], mode: 'notes' };
  }
  const parts = [found[0].text];
  if (found[1] && found[1].score > found[0].score * 0.85) parts.push(found[1].text);
  return { answer: parts.join('\n\n'), sources: found.map(({ title, url }) => ({ title, url })), mode: 'notes' };
}

async function ask(q) {
  try {
    const r = await fetch('/api/ask', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ question: q }) });
    if (r.ok && (r.headers.get('content-type') || '').includes('json')) {
      const d = await r.json();
      if (d.answer) return d;
    }
    if (r.status === 429) { const d = await r.json(); return { answer: d.error, sources: [], mode: 'notes' }; }
  } catch (e) { /* offline or no function: fall back */ }
  return localAnswer(q);
}

function typeInto(el, text) {
  return new Promise((done) => {
    if (reduced) { el.textContent = text; return done(); }
    let i = 0;
    const step = () => {
      i = Math.min(text.length, i + Math.max(2, Math.round(text.length / 90)));
      el.textContent = text.slice(0, i);
      el.closest('.ask-log').scrollTop = 1e6;
      if (i < text.length) setTimeout(step, 14); else done();
    };
    step();
  });
}

const root = document.getElementById('ask');
if (root) {
  const log = root.querySelector('.ask-log');
  const form = root.querySelector('.ask-form');
  const input = form.querySelector('input');
  const btn = form.querySelector('button');
  const state = root.querySelector('.ask-state');
  let busy = false;

  async function run(q) {
    q = q.trim(); if (!q || busy) return;
    busy = true; btn.disabled = true; state.textContent = 'thinking'; root.classList.add('is-busy');
    const you = document.createElement('div'); you.className = 'ask-q'; you.textContent = q;
    const a = document.createElement('div'); a.className = 'ask-a';
    const body = document.createElement('p'); body.className = 'ask-text'; body.textContent = '…';
    a.append(body); log.append(you, a); log.scrollTop = 1e6;
    const res = await ask(q);
    await typeInto(body, res.answer);
    if (res.sources && res.sources.length) {
      const src = document.createElement('div'); src.className = 'ask-src';
      const lbl = document.createElement('span'); lbl.textContent = res.mode === 'model' ? 'sources' : 'from my notes';
      src.append(lbl);
      res.sources.forEach((s) => { const l = document.createElement('a'); l.href = s.url; l.textContent = s.title; src.append(l); });
      a.append(src);
    }
    log.scrollTop = 1e6;
    busy = false; btn.disabled = false; state.textContent = 'ready'; root.classList.remove('is-busy');
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); const q = input.value; input.value = ''; run(q); });
  root.querySelectorAll('.ask-chips button').forEach((b) => b.addEventListener('click', () => run(b.textContent)));
}
