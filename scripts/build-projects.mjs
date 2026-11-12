/* Generates /projects/<slug>.html for every project in src/projects-data.js that has no full case study.
   Run with `npm run projects` (also runs before dev and build).
   Header and footer are copied from an existing case study so all pages match. */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { roleById, roleUrl, logoUrl } from '../src/roles.js';
import { projects, categories, projectSlug, projectUrl, isCaseStudy } from '../src/projects-data.js';

const root = resolve(import.meta.dirname, '..');
const tpl = readFileSync(resolve(root, 'work/oekfb-federation-platform.html'), 'utf8');
const head = tpl.slice(0, tpl.indexOf('<main id="main">'));
const foot = tpl.slice(tpl.indexOf('</main>'));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ext = (h) => (/^https?:/.test(h) ? ' target="_blank" rel="noopener"' : '');
const statusCls = (p) => (p.status === 'Live' ? ' is-live' : p.status === 'In progress' ? ' is-progress' : '');

function page(p) {
  const r = p.org && roleById[p.org];
  const c = categories[p.cat];
  const slug = projectSlug(p);
  const siblings = projects.filter((x) => x.org === p.org);
  const i = siblings.indexOf(p);
  const prev = siblings[i - 1], next = siblings[i + 1];
  const live = p.live || (/^https?:/.test(p.link) ? p.link : null);
  const deep = /^\/work\//.test(p.link) ? p.link : null;
  const imgSrc = p.image || `/work/projects/${slug}.webp`;
  const hasImg = p.image || existsSync(resolve(root, 'public', imgSrc.slice(1)));
  const crumbs = `<nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/index.html">Home</a></li>${r
    ? `<li><a href="/index.html#resume">Experience</a></li><li><a href="${roleUrl(r.id)}">${esc(r.short)}</a></li>`
    : `<li><a href="/index.html#projects">Projects</a></li>`}<li aria-current="page">${esc(p.title)}</li></ol></nav>`;
  const desc = esc(p.text);
  const h = head
    .replace(/<title>.*?<\/title>/, `<title>${esc(p.title)} | Alon Yakoby</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${desc}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(p.title)} | Alon Yakoby`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${desc}`);
  const actions = [
    !p.stores && live && `<a class="btn btn-primary" href="${esc(live)}"${ext(live)}>Try it live ↗</a>`,
    deep && `<a class="btn${live ? '' : ' btn-primary'}" href="${esc(deep)}">Read the technical deep dive</a>`,
    r && `<a class="btn" href="${roleUrl(r.id)}">About my role at ${esc(r.short)}</a>`,
  ].filter(Boolean).join('')
    + (p.stores ? `<div class="store-links">${p.stores.map((l) => `<a class="store-badge" href="${esc(l.href)}"${ext(l.href)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/><path d="M12 7v6M9.5 10.5 12 13l2.5-2.5"/></svg><span><small>${esc(l.sub || 'Download on')}</small><b>${esc(l.label)}</b></span></a>`).join('')}</div>` : '')
    + (p.livePassword ? `<p class="demo-pass">Demo password: <code>${esc(p.livePassword)}</code></p>` : '');
  const body = `<main id="main">

<section class="cs-hero pp-hero">
  <div class="wrap">
    ${crumbs}
    <div class="cs-ctx">${esc(c.label)} · <span class="pj-status${statusCls(p)}">${esc(p.status)}</span></div>
    <h1>${esc(p.title)}</h1>
    <p class="lede">${esc(p.text)}</p>
    <div class="btns">${actions}</div>
  </div>
</section>
<div class="wrap pp-body">
  <figure class="pp-preview${hasImg ? '' : ' is-empty'}">${hasImg
    ? `<img src="${esc(imgSrc)}" alt="Preview of ${esc(p.title)}" loading="lazy" decoding="async">`
    : `<span>Preview coming soon</span>`}</figure>
  <div class="pp-grid">
    <section class="pp-main">
      ${p.details?.length ? `<h2>What I built</h2><ul class="role-hl">${p.details.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>` : ''}
      <h2>Built with</h2>
      <ul class="tags">${p.tech.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
    </section>
    <aside class="pp-side">
      <dl>
        <dt>Status</dt><dd>${esc(p.status)}</dd>
        <dt>Category</dt><dd>${esc(c.label)}</dd>
        ${r ? `<dt>Built at</dt><dd><a class="pp-org" href="${roleUrl(r.id)}"><span class="logo" data-mono="${esc(r.mono)}" aria-hidden="true"><img src="${logoUrl(r.id)}" alt="" width="40" height="40"></span>${esc(r.org)}</a></dd><dt>My role</dt><dd>${esc(r.title)}</dd>` : `<dt>Type</dt><dd>Own project</dd>`}
        ${p.when ? `<dt>When</dt><dd>${esc(p.when.includes('·') ? p.when.slice(p.when.indexOf('·') + 1).trim() : (r ? r.dates : p.when))}</dd>` : ''}
      </dl>
    </aside>
  </div>
  ${prev || next ? `<nav class="cs-nav" aria-label="More projects">
    ${prev ? `<a href="${projectUrl(prev)}"><small>Previous project</small><strong>${esc(prev.title)}</strong></a>` : '<span></span>'}
    ${next ? `<a class="next" href="${projectUrl(next)}"><small>Next project</small><strong>${esc(next.title)}</strong></a>` : '<span></span>'}
  </nav>` : ''}
</div>
`;
  return h + body + foot;
}

mkdirSync(resolve(root, 'projects'), { recursive: true });
const own = projects.filter((p) => !isCaseStudy(p));
own.forEach((p) => writeFileSync(resolve(root, 'projects', `${projectSlug(p)}.html`), page(p)));
console.log(`Generated ${own.length} project pages in projects/`);
