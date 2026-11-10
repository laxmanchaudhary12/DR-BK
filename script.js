(function () {
  var root = document.documentElement;
  root.classList.add('js');

  /* --- Dynamic copyright year --- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* --- Language toggle (remembered between visits) --- */
  function setLang(l) {
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l);
    try { localStorage.setItem('bk-lang', l); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem('bk-lang'); } catch (e) {}
  if (saved === 'ne' || saved === 'en') setLang(saved);
  document.getElementById('langBtn').addEventListener('click', function () {
    setLang(root.getAttribute('data-lang') === 'en' ? 'ne' : 'en');
  });

  /* --- Mobile menu --- */
  var burger = document.getElementById('burger'), menu = document.getElementById('menu');
  function closeMenu() { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* --- Scroll progress bar + active nav link --- */
  var bar = document.getElementById('progress');
  var links = [].slice.call(menu.querySelectorAll('a'));
  var secs = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function onScroll() {
    var h = root.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? window.scrollY / h : 0) + ')';
    var cur = -1;
    secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < 140) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle('active', i === cur); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Reveal on scroll --- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
