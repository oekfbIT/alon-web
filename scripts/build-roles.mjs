/* Generates /experience/<id>.html for every role in src/roles.js.
   Run with `npm run roles` (also runs before dev and build).
   Header and footer are copied from an existing case study so all pages match. */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { roles, roleById, roleUrl, logoUrl } from '../src/roles.js';
import { projects, categories, projectUrl } from '../src/projects-data.js';
import { skillIcon } from '../src/skill-icons.js';

const root = resolve(import.meta.dirname, '..');
const tpl = readFileSync(resolve(root, 'work/oekfb-federation-platform.html'), 'utf8');
const head = tpl.slice(0, tpl.indexOf('<main id="main">'));
const foot = tpl.slice(tpl.indexOf('</main>'));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const back = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>';
const logo = (r, cls = 'logo') => `<span class="${cls}" data-mono="${esc(r.mono)}" aria-hidden="true"><img src="${logoUrl(r.id)}" alt="" width="64" height="64" decoding="async"></span>`;
const ext = (h) => /^https?:/.test(h) ? ' target="_blank" rel="noopener"' : '';

function projectCard(p) {
  const c = categories[p.cat];
  const st = p.status === 'Live' ? ' is-live' : p.status === 'In progress' ? ' is-progress' : '';
  const href = projectUrl(p);
  // Same preview block as the homepage cards: the image when there is one, otherwise a placeholder.
  const media = p.image
    ? `<img src="${esc(p.image)}" alt="" loading="lazy" decoding="async">`
    : `<span class="pj-ph"><small>Preview coming soon</small></span>`;
  return `<article class="pj-card" data-cat="${p.cat}">
<a class="pj-media${p.image ? ' has-img' : ''}" href="${href}" tabindex="-1" aria-hidden="true">${media}<span class="pj-status${st}">${esc(p.status)}</span></a>
<div class="pj-body"><span class="pj-cat"><i class="pj-dot" style="--c:${c.color}"></i>${esc(c.label)}</span>
<h3><a href="${href}">${esc(p.title)}</a></h3><p>${esc(p.text)}</p><ul class="pj-tech">${p.tech.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
<div class="pj-foot"><span>${esc(p.when.includes('·') ? p.when.slice(p.when.indexOf('·') + 1).trim() : (roleById[p.org]?.dates || ''))}</span><a href="${href}">Open project →</a></div></div></article>`;
}

const phoneIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/><path d="M12 7v6M9.5 10.5 12 13l2.5-2.5"/></svg>';
function storeBadges(links) {
  if (!links?.length) return '';
  return `<div class="store-links">${links.map((l) => `<a class="store-badge" href="${esc(l.href)}"${ext(l.href)}>${phoneIcon}<span><small>${esc(l.sub || 'Download on')}</small><b>${esc(l.label)}</b></span></a>`).join('')}</div>`;
}
function phonesRow(sc) {
  return `<ul class="phones">${sc.app.map((a) => `<li><figure><div class="phone"><img src="${esc(a.src)}" alt="${esc(a.alt)}" width="540" height="1174" loading="lazy" decoding="async"></div><figcaption>${esc(a.label)}</figcaption></figure></li>`).join('')}</ul>`;
}
// Screens only (no heading, intro or diagram): injected into case studies between
// <!-- role-screens:ID --> and <!-- /role-screens --> markers.
function screensOnly(r) {
  const sc = r.showcase; if (!sc) return '';
  const groups = sc.screens || [{ url: 'thatsit.cards', items: sc.web }];
  const app = sc.app?.length ? `<div class="phones-head"><h3 class="sub">${esc(sc.appTitle || 'The app')}</h3><span class="muted small">${esc(sc.appNote || '')}</span></div>${storeBadges(sc.appLinks)}${phonesRow(sc)}` : '';
  return groups.map(laptopGroup).join('') + app;
}

function laptopGroup(g) {
  const first = g.items[0];
  const tabs = g.items.length > 1 ? `<div class="seg device-tabs" role="group" aria-label="${esc(g.name || 'Pages')}">${g.items.map((w, k) => `<button type="button" aria-pressed="${k === 0}" data-src="${esc(w.src)}" data-alt="${esc(w.alt)}" data-url="${esc(w.url || g.url || '')}">${esc(w.label)}</button>`).join('')}</div>` : '';
  const head = g.name ? `<h3 class="sub">${esc(g.name)}</h3>` : '';
  return `<div class="device-stage">${head}${tabs}<figure class="laptop"><div class="laptop-screen"><div class="laptop-bar" aria-hidden="true"><i></i><i></i><i></i><span>${esc(first.url || g.url || '')}</span></div><img src="${esc(first.src)}" alt="${esc(first.alt)}" width="1440" height="819" loading="lazy" decoding="async"></div><div class="laptop-base" aria-hidden="true"></div></figure></div>`;
}
function showcase(r) {
  const sc = r.showcase; if (!sc) return '';
  const groups = sc.screens || [{ url: 'thatsit.cards', items: sc.web }];
  const diagram = sc.diagram ? readFileSync(resolve(root, 'scripts/partials', `${sc.diagram}.html`), 'utf8') : '';
  const stores = storeBadges(sc.appLinks);
  const phones = sc.app?.length ? `<div class="phones-head"><h3 class="sub">${esc(sc.appTitle || 'The app')}</h3><span class="muted small">${esc(sc.appNote || '')}</span></div>${stores}<ul class="phones">${sc.app.map((a) => `<li><figure><div class="phone"><img src="${esc(a.src)}" alt="${esc(a.alt)}" width="540" height="1174" loading="lazy" decoding="async"></div><figcaption>${esc(a.label)}</figcaption></figure></li>`).join('')}</ul>` : '';
  const feats = sc.features?.length ? `<ul class="feature-list">${sc.features.map((f) => `<li><strong>${esc(f.title)}</strong><span>${esc(f.text)}</span></li>`).join('')}</ul>` : '';
  const ev = sc.event ? `<figure class="rp-event"><img src="${esc(sc.event.photo)}" alt="${esc(sc.event.alt)}" width="900" height="1600" loading="lazy" decoding="async"><figcaption><small>${esc(sc.event.title)}</small><p>${esc(sc.event.text)}</p></figcaption></figure>` : '';
  return `<section class="cs-section" id="product"><h2>${esc(sc.title || 'The product')}</h2><p>${esc(sc.intro)}</p>${diagram}${groups.map(laptopGroup).join('')}${phones}${feats}${ev}</section>`;
}
function team(r) {
  const t = r.team; if (!t) return '';
  return `<section class="cs-section" id="team"><h2>The team</h2><figure class="team-photo"><img src="${esc(t.photo)}" alt="${esc(t.alt)}" width="1280" height="751" loading="lazy" decoding="async"></figure><p>${esc(t.intro)}</p><ul class="team-list">${t.members.map((m) => {
    const name = m.href ? `<a href="${esc(m.href)}"${ext(m.href)}>${esc(m.name)}</a>` : esc(m.name);
    return `<li${m.me ? ' class="is-me"' : ''}><strong>${name}${m.me ? ' <small>(me)</small>' : ''}</strong><span>${esc(m.role)}</span>${m.badge ? `<em class="badge">${esc(m.badge)}</em>` : ''}</li>`;
  }).join('')}</ul></section>`;
}
function press(r) {
  if (!r.press?.length) return '';
  return `<section class="cs-section" id="press"><h2>In the press</h2><ul class="press-list">${r.press.map((x) => `<li><a href="${esc(x.href)}"${ext(x.href)}><small>${esc(x.outlet)} · ${esc(x.date)}</small><strong>${esc(x.title)}</strong><span class="work-go">${arrow}</span></a></li>`).join('')}</ul></section>`;
}

function page(r, i) {
  const built = projects.filter((p) => p.org === r.id);
  const prev = roles[i - 1], next = roles[i + 1];
  const toc = [built.length && ['built', 'Things I built'], r.showcase && ['product', r.showcase.title || 'The product'], ['did', 'What I did'], r.team && ['team', 'The team'], ['learned', 'What I learned'], r.caseStudies.length && ['case-studies', 'Case studies'], r.press?.length && ['press', 'In the press'], ['skills', 'Skills']].filter(Boolean);
  const desc = `${r.title} at ${r.org}, ${r.dates}. ${r.summary}`;
  const h = head
    .replace(/<title>.*?<\/title>/, `<title>${esc(r.org)} · ${esc(r.title)} | Alon Yakoby</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(desc)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(r.org)} | Alon Yakoby`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(desc)}`);
  const body = `<main id="main">

<section class="cs-hero rp-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/index.html">Home</a></li><li><a href="/index.html#resume">Experience</a></li><li aria-current="page">${esc(r.short)}</li></ol></nav>
    <div class="rp-id">${logo(r, 'logo logo-xl')}<div><div class="cs-ctx">${esc(r.dates)} · ${esc(r.type)}</div><h1>${esc(r.org)}</h1><p class="rp-title">${esc(r.title)}</p></div></div>
    <p class="lede">${esc(r.summary)}</p>
    ${r.demo ? `<div class="demo-box"><div><small>Live demo</small><b>${esc(r.demo.title)}</b><span>${esc(r.demo.text)} Password: <code>${esc(r.demo.password)}</code></span></div><a class="btn btn-primary" href="${esc(r.demo.href)}"${ext(r.demo.href)}>Open the demo ↗</a></div>` : ''}
    ${r.links.length ? `<div class="role-links">${r.links.map((l) => `<a class="btn btn-sm" href="${esc(l.href)}"${ext(l.href)}>${esc(l.label)} ↗</a>`).join('')}</div>` : ''}
  </div>
</section>
<div class="wrap">
  <div class="cs-body">
    <nav class="cs-toc" aria-label="On this page"><ol>${toc.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ol></nav>
    <article>
${built.length ? `<section class="cs-section" id="built"><h2>Things I built at ${esc(r.short)}</h2><div class="rp-grid">${built.map(projectCard).join('\n')}</div></section>` : ''}
${showcase(r)}
<section class="cs-section" id="did"><h2>What I did</h2><ul class="role-hl">${r.did.map((d) => `<li>${esc(d)}</li>`).join('')}</ul></section>
${team(r)}
<section class="cs-section" id="learned"><h2>What I learned</h2><p>${esc(r.learned)}</p></section>
${r.caseStudies.length ? `<section class="cs-section" id="case-studies"><h2>Case studies</h2><ul class="work-list rp-work">${r.caseStudies.map((c) => `<li class="work-item"><a href="${esc(c.href)}"><div><div class="work-ctx">${esc(r.short)} · case study</div><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></div><span class="work-go">${arrow}</span></a></li>`).join('')}</ul></section>` : ''}
${press(r)}
<section class="cs-section" id="skills"><h2>Skills</h2><ul class="tags">${r.tags.map((t) => { const ico = skillIcon(t); return `<li>${ico ? `<span class="ico" style="--ico:url(${ico})" aria-hidden="true"></span>` : ''}${esc(t)}</li>`; }).join('')}</ul></section>
    </article>
  </div>
  <nav class="cs-nav" aria-label="More roles">
    ${prev ? `<a class="cs-nav-card" href="${roleUrl(prev.id)}">${logo(prev, 'logo logo-lg')}<span class="cs-nav-txt"><small>Newer role</small><strong>${esc(prev.org)}</strong></span></a>` : '<span></span>'}
    ${next ? `<a class="next cs-nav-card" href="${roleUrl(next.id)}">${logo(next, 'logo logo-lg')}<span class="cs-nav-txt"><small>Earlier role</small><strong>${esc(next.org)}</strong></span></a>` : '<span></span>'}
  </nav>
</div>
`;
  return h + body + foot;
}

mkdirSync(resolve(root, 'experience'), { recursive: true });
roles.forEach((r, i) => writeFileSync(resolve(root, 'experience', `${r.id}.html`), page(r, i)));

// Keep case-study screen galleries in sync with roles.js
for (const f of readdirSync(resolve(root, 'work')).filter((x) => x.endsWith('.html'))) {
  const fp = resolve(root, 'work', f);
  const html = readFileSync(fp, 'utf8');
  const out = html.replace(/(<!-- role-screens:([a-z0-9-]+) -->)[\s\S]*?(<!-- \/role-screens -->)/g, (m, a, id, b) => (roleById[id] ? a + screensOnly(roleById[id]) + b : m));
  if (out !== html) { writeFileSync(fp, out); console.log(`Updated screens in work/${f}`); }
}
console.log(`Generated ${roles.length} role pages in experience/`);
