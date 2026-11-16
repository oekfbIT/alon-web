/* "Ask me" chat: retrieval over src/kb.js, answered by /api/ask when a model is configured,
   otherwise answered directly from the best-matching passages.
   Exports ask() for the full chat page (src/chat.js); also runs the small widget on the homepage. */
import { retrieve, allDocs, isGerman } from './kb.js';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function localAnswer(q, previous = '') {
  const de = isGerman(q) || document.documentElement.lang === 'de';
  const txt = (d) => (de && d.textDe) || d.text;
  let found = retrieve(q, previous, 4);
  // In German, prefer entries that have a German answer.
  if (de && found.some((d) => d.textDe)) found = [...found.filter((d) => d.textDe), ...found.filter((d) => !d.textDe)];
  if (!found.length) {
    const intro = allDocs.find((d) => d.id === 'intro');
    const tail = de
      ? 'Zu dieser Frage habe ich hier keine eigene Antwort. Frag mich gern nach meinem Stack, meiner KI-Arbeit, der Fußballplattform, Banking-Erfahrung oder wann ich starten kann, oder schreib mir an alon.yakoby@gmail.com.'
      : 'I don’t have a specific answer to that here. Ask me about my stack, my AI work, the football platform, banking experience or when I can start, or email me at alon.yakoby@gmail.com.';
    return { answer: txt(intro) + '\n\n' + tail, sources: [{ title: de ? 'Kontakt' : 'Contact', url: '/#contact' }], mode: 'notes' };
  }
  const parts = [txt(found[0])];
  found.slice(1, 3).forEach((d) => { if (d.score > found[0].score * 0.7 && (!de || d.textDe || !found[0].textDe)) parts.push(txt(d)); });
  const links = found.filter((d) => d.url && d.url !== '/chat.html').filter((d, i, a) => a.findIndex((x) => x.url === d.url) === i).slice(0, 3).map(({ title, url }) => ({ title, url }));
  return { answer: parts.join('\n\n'), sources: links, mode: 'notes' };
}

/* history: [{ role: 'user'|'assistant', content }] of earlier turns, oldest first */
export async function ask(q, history = []) {
  try {
    const r = await fetch('/api/ask', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ question: q, history: history.slice(-6) }) });
    if (r.ok && (r.headers.get('content-type') || '').includes('json')) {
      const d = await r.json();
      if (d.answer) return d;
    }
    if (r.status === 429) { const d = await r.json(); return { answer: d.error, sources: [], mode: 'notes' }; }
  } catch (e) { /* offline or no function: fall back */ }
  const previous = [...history].reverse().find((m) => m.role === 'user')?.content || '';
  return localAnswer(q, previous);
}

export function typeInto(el, text, scroller) {
  return new Promise((done) => {
    if (reduced) { el.textContent = text; return done(); }
    let i = 0;
    const step = () => {
      i = Math.min(text.length, i + Math.max(2, Math.round(text.length / 90)));
      el.textContent = text.slice(0, i);
      if (scroller) scroller.scrollTop = 1e6;
      if (i < text.length) setTimeout(step, 14); else done();
    };
    step();
  });
}

/* The homepage widget is a preview, not a second chat: it never answers inline.
   Any question (typed, submitted, or a suggested chip) opens the full chat at
   /chat.html?q=… , which asks it there. */
const root = document.getElementById('ask');
if (root) {
  const form = root.querySelector('.ask-form');
  const input = form.querySelector('input');

  function openWith(q) {
    q = q.trim(); if (!q) { location.href = '/chat.html'; return; }
    location.href = '/chat.html?q=' + encodeURIComponent(q);
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); openWith(input.value); });
  root.querySelectorAll('.ask-chips button').forEach((b) => b.addEventListener('click', () => openWith(b.textContent)));
}
