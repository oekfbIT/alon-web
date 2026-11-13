/* Generates /projects/<slug>.html for every project in src/projects-data.js that has no full case study.
   Run with `npm run projects` (also runs before dev and build).
   Header and footer are copied from an existing case study so all pages match. */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { roleById, roleUrl, logoUrl } from '../src/roles.js';
import { projects, categories, projectSlug, projectUrl, isCaseStudy } from '../src/projects-data.js';
import { skillIcon } from '../src/skill-icons.js';

const root = resolve(import.meta.dirname, '..');
const tpl = readFileSync(resolve(root, 'work/oekfb-federation-platform.html'), 'utf8');
const head = tpl.slice(0, tpl.indexOf('<main id="main">'));
const foot = tpl.slice(tpl.indexOf('</main>'));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ext = (h) => (/^https?:/.test(h) ? ' target="_blank" rel="noopener"' : '');
const tagHtml = (t) => { const ico = skillIcon(t); return `<li>${ico ? `<span class="ico" style="--ico:url(${ico})" aria-hidden="true"></span>` : ''}${esc(t)}</li>`; };
// Previous/next cell: the same preview image as that project's detail page, with the company logo on it.
const navCard = (q, label, next) => {
  const qr = q.org && roleById[q.org];
  const img = q.image || `/work/projects/${projectSlug(q)}.webp`;
  const hasImg = q.image || existsSync(resolve(root, 'public', img.slice(1)));
  const badge = qr ? `<span class="logo logo-sm pj-nav-badge" data-mono="${esc(qr.mono)}" aria-hidden="true"><img src="${logoUrl(qr.id)}" alt="" width="40" height="40"></span>` : `<span class="logo logo-sm pj-nav-badge" data-mono="✦" aria-hidden="true"></span>`;
  const media = hasImg ? `<img src="${esc(img)}" alt="" loading="lazy" decoding="async">` : `<span class="pj-ph"></span>`;
  return `<a class="cs-nav-card${next ? ' next' : ''}" href="${projectUrl(q)}"><span class="pj-nav-media${hasImg ? ' has-img' : ''}">${media}${badge}</span><span class="cs-nav-txt"><small>${label}</small><strong>${esc(q.title)}</strong></span></a>`;
};

// Screens gallery: phone screenshots in a 4-up grid, desktop screenshots in a 2-up grid. Click opens the full image.
const gallery = (p) => {
  if (!p.gallery?.length) return '';
  const groups = [['phone', p.gallery.filter((g) => g.kind === 'phone')], ['wide', p.gallery.filter((g) => g.kind !== 'phone')]];
  const html = groups.filter(([, l]) => l.length).map(([k, l]) => `<div class="pp-gallery is-${k}">${l.map((g) =>
    `<figure><a href="${esc(g.src)}" target="_blank" rel="noopener"><img src="${esc(g.src)}" alt="${esc(g.cap)}" loading="lazy" decoding="async"></a><figcaption>${esc(g.cap)}</figcaption></figure>`).join('')}</div>`).join('');
  return `<section class="pp-screens"><h2>${esc(p.galleryTitle || 'Screens')}</h2>${html}</section>`;
};
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
  const imgSrc = p.header || p.image || `/work/projects/${slug}.webp`;
  const hasImg = p.image || existsSync(resolve(root, 'public', imgSrc.slice(1)));
  const rich = !!(p.about?.length || p.steps?.length || p.details?.length);
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
    ? `<img src="${esc(imgSrc)}" alt="${esc(p.headerAlt || `Preview of ${p.title}`)}" loading="eager" decoding="async">`
    : `<span>Preview coming soon</span>`}</figure>
  <div class="pp-grid">
    <section class="pp-main">
      ${p.about?.length ? `<h2>Overview</h2>${p.about.map((t) => `<p>${esc(t)}</p>`).join('')}` : ''}
      ${p.steps?.length ? `<h2>${esc(p.stepsTitle || 'How it works')}</h2><ol class="pp-steps">${p.steps.map(([t, d]) => `<li><strong>${esc(t)}.</strong> ${esc(d)}</li>`).join('')}</ol>` : ''}
      ${p.details?.length ? `<h2>What I built</h2><ul class="role-hl">${p.details.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>` : ''}
      ${rich ? '' : `<h2>Built with</h2><ul class="tags">${p.tech.map(tagHtml).join('')}</ul>`}
    </section>
    <aside class="pp-side">
      <dl>
        <dt>Status</dt><dd>${esc(p.status)}</dd>
        <dt>Category</dt><dd>${esc(c.label)}</dd>
        ${r ? `<dt>Built at</dt><dd><a class="pp-org" href="${roleUrl(r.id)}"><span class="logo" data-mono="${esc(r.mono)}" aria-hidden="true"><img src="${logoUrl(r.id)}" alt="" width="40" height="40"></span>${esc(r.org)}</a></dd><dt>My role</dt><dd>${esc(r.title)}</dd>` : `<dt>Type</dt><dd>Own project</dd>`}
        ${p.when ? `<dt>When</dt><dd>${esc(p.when.includes('·') ? p.when.slice(p.when.indexOf('·') + 1).trim() : (r ? r.dates : p.when))}</dd>` : ''}
      </dl>
      ${rich ? `<h3 class="pp-side-h">Built with</h3><ul class="tags">${p.tech.map(tagHtml).join('')}</ul>` : ''}
    </aside>
  </div>
  ${gallery(p)}
  ${prev || next ? `<nav class="cs-nav" aria-label="More projects">
    ${prev ? navCard(prev, 'Previous project', false) : '<span></span>'}
    ${next ? navCard(next, 'Next project', true) : '<span></span>'}
  </nav>` : ''}
</div>
`;
  return h + body + foot;
}

mkdirSync(resolve(root, 'projects'), { recursive: true });
const own = projects.filter((p) => !isCaseStudy(p));
own.forEach((p) => writeFileSync(resolve(root, 'projects', `${projectSlug(p)}.html`), page(p)));
console.log(`Generated ${own.length} project pages in projects/`);

// Case studies (work/*.html): rebuild their previous/next cards in the same style (thumbnail + company logo).
// The thumbnail is the image of the project that links to that case study; overrides cover pages no project links to directly.
const caseOverrides = { 'oekfb-federation-platform.html': { image: '/work/oekfb/oekfb-site.webp', org: 'oekfb' } };
const caseMeta = (file) => caseOverrides[file] || projects.find((x) => x.link === `/work/${file}`) || {};
const casePages = readdirSync(resolve(root, 'work')).filter((f) => f.endsWith('.html'));
for (const f of casePages) {
  const fp = resolve(root, 'work', f);
  const html = readFileSync(fp, 'utf8');
  const out = html.replace(/<nav class="cs-nav" aria-label="More work">[\s\S]*?<\/nav>/, (block) => {
    const cards = [...block.matchAll(/<a [^>]*href="([^"]+)"[^>]*>[\s\S]*?<small>([^<]*)<\/small><strong>([^<]*)<\/strong>[\s\S]*?<\/a>/g)];
    if (!cards.length) return block;
    const html2 = cards.map(([, href, label, title], i) => {
      const file = href.split('/').pop();
      const m = caseMeta(file); const r = m.org && roleById[m.org];
      const badge = r ? `<span class="logo logo-sm pj-nav-badge" data-mono="${esc(r.mono)}" aria-hidden="true"><img src="${logoUrl(r.id)}" alt="" width="40" height="40"></span>` : '';
      const media = m.image ? `<img src="${esc(m.image)}" alt="" loading="lazy" decoding="async">` : '<span class="pj-ph"></span>';
      const next = /next/i.test(label);
      return `    <a class="cs-nav-card${next ? ' next' : ''}" href="${href}"><span class="pj-nav-media${m.image ? ' has-img' : ''}">${media}${badge}</span><span class="cs-nav-txt"><small>${label}</small><strong>${title}</strong></span></a>`;
    }).join('\n');
    return `<nav class="cs-nav" aria-label="More work">\n${html2}\n  </nav>`;
  });
  if (out !== html) writeFileSync(fp, out);
}
