/* Language switch: English (default) and German.
   A dropdown in the navbar switches the whole page. German text lives in src/de.json, keyed by the exact
   English text, so any text node, alt, title, placeholder or aria-label that matches is translated.
   Anything without an entry stays English. A MutationObserver also translates content that scripts add later
   (project cards, skills, ...). Strings built from several parts ("ÖKFB · Full-Stack") are translated part by part. */
import de from './de.json';

var KEY = 'lang';
var root = document.documentElement;
var ATTRS = ['alt', 'title', 'placeholder', 'aria-label'];
var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, OPTION: 1 };
var RULES = [
  [/^\+(\d+) more$/, '+$1 weitere'],
  [/^(\d+)y$/, '$1 J.'],
  [/^since (\d{4})$/, 'seit $1'],
  [/^More from (.+)$/, 'Mehr von $1'],
  [/^Details: (.+)$/, 'Details: $1']
];
var lang = 'en';
var textRec = new Map();   // text node -> { en, de }
var attrRec = [];          // { el, attr, en, de }
var observer = null;

function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

function tr(s) {
  if (!s) return s;
  if (Object.prototype.hasOwnProperty.call(de, s)) return de[s];
  if (s.slice(-2) === ' ↗') { var t = tr(s.slice(0, -2)); return t === s.slice(0, -2) ? s : t + ' ↗'; }
  for (var sep of [' | ', ' · ']) {
    if (s.indexOf(sep) > -1) {
      var parts = s.split(sep), out = parts.map(tr);
      return out.join(sep);
    }
  }
  for (var i = 0; i < RULES.length; i++) if (RULES[i][0].test(s)) return s.replace(RULES[i][0], RULES[i][1]);
  return s;
}

function doText(node) {
  var rec = textRec.get(node);
  if (rec && node.data === rec.de) return;
  var raw = node.data, core = norm(raw);
  if (!core) return;
  var out = tr(core);
  if (out === core) return;
  var lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
  var next = lead + out + trail;
  textRec.set(node, { en: raw, de: next });
  node.data = next;
}

function doAttrs(el) {
  for (var i = 0; i < ATTRS.length; i++) {
    var a = ATTRS[i], v = el.getAttribute && el.getAttribute(a);
    if (!v) continue;
    var rec = null;
    for (var j = 0; j < attrRec.length; j++) if (attrRec[j].el === el && attrRec[j].attr === a) { rec = attrRec[j]; break; }
    if (rec && v === rec.de) continue;
    var out = tr(norm(v));
    if (out === norm(v)) continue;
    if (rec) { rec.en = v; rec.de = out; } else attrRec.push({ el: el, attr: a, en: v, de: out });
    el.setAttribute(a, out);
  }
}

function walk(node) {
  if (node.nodeType === 3) { doText(node); return; }
  if (node.nodeType !== 1 || SKIP[node.nodeName] || node.hasAttribute('data-no-i18n') || node.classList.contains('lang-select')) return;
  doAttrs(node);
  for (var c = node.firstChild; c; c = c.nextSibling) walk(c);
}

function toGerman() {
  walk(document.body);
  document.title = tr(document.title);
  if (observer) return;
  observer = new MutationObserver(function (list) {
    list.forEach(function (m) {
      if (m.type === 'characterData') doText(m.target);
      else m.addedNodes.forEach(walk);
    });
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
}

function toEnglish() {
  if (observer) { observer.disconnect(); observer = null; }
  textRec.forEach(function (rec, node) { if (node.data === rec.de) node.data = rec.en; });
  textRec.clear();
  attrRec.forEach(function (r) { if (r.el.getAttribute(r.attr) === r.de) r.el.setAttribute(r.attr, r.en); });
  attrRec = [];
  if (enTitle) document.title = enTitle;
}

var enTitle = document.title;

function apply(l) {
  if (l === lang) return;
  lang = l;
  root.lang = l;
  if (l === 'de') toGerman(); else toEnglish();
}

function saved() { try { return localStorage.getItem(KEY) === 'de' ? 'de' : 'en'; } catch (e) { return 'en'; } }

function addSwitcher() {
  var themeBtn = document.querySelector('.theme-btn');
  if (!themeBtn || document.querySelector('.lang-select')) return;
  var sel = document.createElement('select');
  sel.className = 'lang-select';
  sel.setAttribute('aria-label', 'Language');
  sel.innerHTML = '<option value="en">English</option><option value="de">Deutsch</option>';
  sel.value = saved();
  sel.addEventListener('change', function () {
    try { localStorage.setItem(KEY, sel.value); } catch (e) {}
    apply(sel.value);
  });
  themeBtn.parentNode.insertBefore(sel, themeBtn);
  apply(sel.value);
}

addSwitcher();
