/* The chat's searchable knowledge: hand-written entries (knowledge.js) plus the generated index
   (knowledge-index.js, from knowledge/*.md, roles.js and projects-data.js). Shared by browser and api/ask.js. */
import { knowledge } from './knowledge.js';
import { docs } from './knowledge-index.js';
import { createRetriever } from './retrieve.js';

export const allDocs = [...knowledge, ...docs];
export const search = createRetriever(allDocs);

/* Retrieve for a question, plus a little for the previous question so follow-ups ("and how?") keep their topic. */
export function retrieve(question, previous = '', k = 6) {
  const seen = new Set();
  const out = [];
  for (const d of [...search(question, k), ...(previous ? search(previous, 2) : [])]) {
    if (seen.has(d.id)) continue;
    seen.add(d.id); out.push(d);
  }
  return out.slice(0, k + 1);
}
