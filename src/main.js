import "./projects.js";
import "./toolbox.js";
import "./ask.js";
import "./cv.js";
/* Alon Yakoby portfolio — small, dependency-free interactions */
(function () {
  var root = document.documentElement;

  /* Theme: follows the system until the visitor picks one */
  var themeBtn = document.querySelector('.theme-btn');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var dark = root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    var next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* Mobile menu */
  var menuBtn = document.querySelector('.menu-btn'), nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); } });
  }

  /* Header hairline once scrolled */
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('scrolled', scrollY > 8); }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* How I Work: transit line stations */
  var stops = document.querySelectorAll('.stop');
  var panel = document.querySelector('.transit-panel');
  stops.forEach(function (stop) {
    stop.addEventListener('click', function () {
      stops.forEach(function (s) { s.setAttribute('aria-pressed', 'false'); });
      stop.setAttribute('aria-pressed', 'true');
      panel.querySelector('.n').textContent = stop.dataset.n;
      panel.querySelector('h3').textContent = stop.querySelector('.stop-label').textContent;
      panel.querySelector('p').textContent = stop.dataset.desc;
    });
  });

  /* Case-study diagrams: a segmented control switches the diagram's scenario.
     Elements with data-show="a b" are highlighted (is-on) in those scenarios,
     data-fail="b" marks them as the failure path, data-dim="a" fades them. */
  document.querySelectorAll('[data-scenarios]').forEach(function (fig) {
    var buttons = fig.querySelectorAll('.seg button');
    function apply(s) {
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.s === s)); });
      fig.querySelectorAll('[data-show],[data-fail],[data-dim]').forEach(function (el) {
        var has = function (attr) { return (el.getAttribute(attr) || '').split(' ').indexOf(s) !== -1; };
        el.classList.toggle('is-on', has('data-show'));
        el.classList.toggle('is-fail', has('data-fail'));
        el.classList.toggle('is-dim', has('data-dim'));
      });
      fig.querySelectorAll('[data-text-' + s + ']').forEach(function (el) { el.innerHTML = el.getAttribute('data-text-' + s); });
    }
    buttons.forEach(function (b) { b.addEventListener('click', function () { apply(b.dataset.s); }); });
    apply(buttons[0].dataset.s);
  });

  /* Case-study table of contents: highlight current section */
  var tocLinks = document.querySelectorAll('.cs-toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { tocLinks.forEach(function (a) { a.classList.remove('active'); }); map[en.target.id].classList.add('active'); }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }
})();
