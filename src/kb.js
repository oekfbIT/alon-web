/* The chat's searchable knowledge: hand-written entries (knowledge.js) plus the generated index
   (knowledge-index.js, from knowledge/*.md, roles.js and projects-data.js). Shared by browser and api/ask.js. */
import { knowledge } from './knowledge.js';
import { docs } from './knowledge-index.js';
import { createRetriever } from './retrieve.js';
import { knowledgeDe, intents } from './knowledge-de.js';

// German search words are added to each hand-written entry, and its German text is kept as textDe.
const withDe = knowledge.map((d) => knowledgeDe[d.id] ? { ...d, tags: d.tags + ' ' + knowledgeDe[d.id].tags, textDe: knowledgeDe[d.id].text } : d);
export const allDocs = [...withDe, ...docs];

const GERMAN = /[äöüß]|\b(ich|du|dir|dich|mir|mich|und|nicht|wie|was|wer|wann|warum|wieso|welche[nrs]?|erzähl|erzähle|hast|kannst|bist|deine[nrm]?|über|für|mit|bei|sind|ist|gibt|arbeitest|machst)\b/i;
export const isGerman = (s) => GERMAN.test(s || '');
export const search = createRetriever(allDocs);

/* Retrieve for a question, plus a little for the previous question so follow-ups ("and how?") keep their topic. */
export function retrieve(question, previous = '', k = 6) {
  const seen = new Set();
  const out = [];
  // Common interview questions ("Tell me about yourself", "Erzähl mir von dir") go straight to their entry.
  const byIntent = intents.filter(([re]) => re.test(question)).flatMap(([, ids]) => ids)
    .map((id) => allDocs.find((d) => d.id === id)).filter(Boolean).map((d) => ({ ...d, score: 99 }));
  for (const d of [...byIntent, ...search(question, k), ...(previous ? search(previous, 2) : [])]) {
    if (seen.has(d.id)) continue;
    seen.add(d.id); out.push(d);
  }
  return out.slice(0, k + 2);
}

/* A compact, always-on overview (who I am, every role with dates, stack) so the model can answer broad
   questions ("do you fit this role?", "what's your banking experience?") across the whole career,
   not only from the few passages that happen to match the wording. */
const byId = Object.fromEntries(allDocs.map((d) => [d.id, d]));
export const profileContext = [
  ...['intro', 'available', 'contact', 'stack', 'ai-overview', 'leadership', 'banking', 'ownership']
    .map((id) => byId[id]).filter(Boolean).map((d) => `${d.title}: ${d.text}`),
  'Roles, newest first:',
  ...allDocs.filter((d) => d.id.startsWith('role-')).map((d) => '- ' + d.text.split('\n').slice(0, 2).join(' ')),
].join('\n');
