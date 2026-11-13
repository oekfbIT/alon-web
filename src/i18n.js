/* Language switch: English (default) and German.
   The navbar gets a dropdown; text marked with data-i18n, nav links and a few aria-labels are swapped in place.
   English text is kept in data-en attributes, so switching back restores the original. */
var DE = {
  'Skip to content': 'Zum Inhalt springen',
  'About': 'Über mich',
  'Interview me': 'Stell mir Fragen',
  'Projects': 'Projekte',
  'Experience': 'Erfahrung',
  'Skills': 'Skills',
  'Contact': 'Kontakt',
  'Résumé ↗': 'Lebenslauf ↗',
  'My résumé ↗': 'Mein Lebenslauf ↗',
  'Get in touch': 'Kontakt aufnehmen',
  'What I do': 'Was ich mache',
  'I build software that has to work on match day.': 'Ich baue Software, die am Spieltag funktionieren muss.',
  'An engineer who ships, a designer by training, and a volunteer for grassroots football.': 'Ein Ingenieur, der liefert, von Haus aus Designer und ehrenamtlich im Breitenfußball aktiv.',
  'I build complete products, from the model and the database to the app in someone’s hand, and I stay to run them in production. Right now that means AI for sports and collectors: grounded match previews, video analysis and vision search.':
    'Ich baue komplette Produkte, vom Modell und der Datenbank bis zur App in der Hand eines Nutzers, und bleibe dabei, um sie im Produktivbetrieb zu betreuen. Im Moment heißt das KI für Sport und Sammler: fundierte Spielvorschauen, Videoanalyse und Bildsuche.',
  'Things I’ve built': 'Was ich gebaut habe',
  'More projects': 'Weitere Projekte',
  'What employers say': 'Was Arbeitgeber sagen',
  'Building something that has to work on match day?': 'Etwas bauen, das am Spieltag funktionieren muss?',
  'I’m open to full-stack and AI engineering roles from December 2026, and always happy to talk about sports tech, vision AI or platforms that people rely on.':
    'Ich bin ab Dezember 2026 offen für Full-Stack- und KI-Engineering-Rollen und spreche immer gern über Sport-Tech, Vision-KI oder Plattformen, auf die sich Menschen verlassen.',
  'Email': 'E-Mail',
  'Language': 'Sprache'
};
var ARIA_DE = {
  'Switch light or dark theme': 'Hell- oder Dunkelmodus wechseln',
  'Open menu': 'Menü öffnen',
  'Language': 'Sprache'
};
var KEY = 'lang';
var root = document.documentElement;

function savedLang() {
  try { return localStorage.getItem(KEY) === 'de' ? 'de' : 'en'; } catch (e) { return 'en'; }
}

function apply(lang) {
  root.lang = lang;
  document.querySelectorAll('.skip, .site-header .nav a, [data-i18n]').forEach(function (el) {
    if (!el.dataset.en) el.dataset.en = el.textContent.trim();
    el.textContent = lang === 'de' ? (DE[el.dataset.en] || el.dataset.en) : el.dataset.en;
  });
  document.querySelectorAll('.theme-btn, .menu-btn, .lang-select').forEach(function (el) {
    if (!el.dataset.enAria) el.dataset.enAria = el.getAttribute('aria-label') || '';
    var label = el.dataset.enAria;
    el.setAttribute('aria-label', lang === 'de' ? (ARIA_DE[label] || label) : label);
  });
}

function addSwitcher() {
  var themeBtn = document.querySelector('.theme-btn');
  if (!themeBtn || document.querySelector('.lang-select')) return;
  var sel = document.createElement('select');
  sel.className = 'lang-select';
  sel.setAttribute('aria-label', 'Language');
  sel.innerHTML = '<option value="en">English</option><option value="de">Deutsch</option>';
  sel.value = savedLang();
  sel.addEventListener('change', function () {
    try { localStorage.setItem(KEY, sel.value); } catch (e) {}
    apply(sel.value);
  });
  themeBtn.parentNode.insertBefore(sel, themeBtn);
  apply(sel.value);
}

addSwitcher();
