/* Small BM25 retriever over the knowledge base. Shared by the browser chat and the api/ask function. */
const STOP = new Set('a an and are as at be by can do does for from have how i in is it me my of on or so tell that the this to was what when where which who why with you your about any anything give some'.split(' '));
const SYN = { js: 'javascript', ts: 'typescript', k8s: 'kubernetes', cicd: 'ci', 'ci/cd': 'ci', llms: 'llm', ml: 'machine', hire: 'available', job: 'available', work: 'experience', ökfb: 'oekfb', fussball: 'football', fußball: 'football', projects: 'project', built: 'project', build: 'project' };

export function tokens(s) {
  return s.toLowerCase().replace(/[^a-z0-9äöüß/\s-]/g, ' ').split(/[\s-]+/)
    .map((t) => SYN[t] || t).filter((t) => t && !STOP.has(t))
    .map((t) => (t.length > 4 && t.endsWith('s') ? t.slice(0, -1) : t));
}

export function createRetriever(docs) {
  const index = docs.map((d) => {
    const tf = {};
    const toks = [...tokens(d.title), ...tokens(d.tags), ...tokens(d.tags), ...tokens(d.text)];
    toks.forEach((t) => { tf[t] = (tf[t] || 0) + 1; });
    return { d, tf, len: toks.length };
  });
  const avg = index.reduce((s, x) => s + x.len, 0) / index.length;
  const df = {};
  index.forEach((x) => Object.keys(x.tf).forEach((t) => { df[t] = (df[t] || 0) + 1; }));
  const N = index.length, k1 = 1.4, b = 0.7;
  return function search(q, k = 3) {
    const qt = [...new Set(tokens(q))];
    return index.map((x) => {
      let s = 0;
      qt.forEach((t) => {
        const f = x.tf[t] || Object.keys(x.tf).filter((w) => w.length > 3 && t.length > 3 && (w.startsWith(t) || t.startsWith(w))).reduce((a, w) => a + x.tf[w] * 0.6, 0);
        if (!f) return;
        const idf = Math.log(1 + (N - (df[t] || 1) + 0.5) / ((df[t] || 1) + 0.5));
        s += idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * x.len / avg));
      });
      return { ...x.d, score: s };
    }).filter((x) => x.score > 0.5).sort((a, b2) => b2.score - a.score).slice(0, k);
  };
}
