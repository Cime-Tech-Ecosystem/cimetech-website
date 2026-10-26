/* Cime Tech shared site script.
   - Header and footer live here ONLY (edit once, updates every page).
   - Also: mobile menu, header that turns solid on scroll, elevation gauge,
     floating contact button, contour movement, and analytics events. */
(function () {
  'use strict';

  var isPagesFolder = /\/pages\//i.test(location.pathname);
  var assetBase = isPagesFolder ? '../assets' : 'assets';

  function pageLink(target) {
    if (isPagesFolder) return target === 'index.html' ? '../index.html' : target;
    return target === 'index.html' ? 'index.html' : 'pages/' + target;
  }
  function assetPath(name) { return assetBase + '/' + name; }

  /* ---------- One-place settings ---------- */
  var CIME = {
    showInsights: false,            // set to true once the first article is published
    whatsapp: '2348164169025',
    phoneTel: '+2348164169025',
    phoneDisplay: '+234 816 416 9025',
    email: 'hello@cimetechsystem.com',
    tourMessage: 'Hello, I would like to book a tour of The Cime Hub',
    plausibleDomain: '',            // e.g. 'cimetech.com' to switch on Plausible
    ga4Id: ''                       // e.g. 'G-XXXXXXXXXX' to switch on GA4
  };

  var NAV = [
    ['index.html', 'Home'],
    ['hub.html', 'The Cime Hub'],
    ['about.html', 'About'],
    ['solutions.html', 'Solutions'],
    ['partners.html', 'Partners'],
    ['insights.html', 'Insights', 'insights'],
    ['contact.html', 'Contact']
  ].filter(function (n) { return n[2] !== 'insights' || CIME.showInsights; });

  var page = location.pathname.split('/').pop() || 'index.html';
  if (page.indexOf('.') === -1) page += '.html';

  function cur(href) {
    var target = href.replace(/^\.\.\//, '').replace(/^pages\//, '');
    return target === page ? ' aria-current="page"' : '';
  }
  function wa(text) { return 'https://wa.me/' + CIME.whatsapp + (text ? '?text=' + encodeURIComponent(text) : ''); }

  var iconWA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5.2A8.5 8.5 0 1 1 21 11.5z"/><path d="M9 9.5c.3 2.2 2.8 4.7 5 5l1.3-1.3-1.9-1-.9.7c-.8-.3-1.7-1.2-2-2l.7-.9-1-1.9z"/></svg>';
  var iconPhone = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
  var iconChat = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

  /* ---------- Header ---------- */
  function desktopLinks() {
    return NAV.map(function (n) {
      var href = pageLink(n[0]);
      var inner = n[0] === 'hub.html' ? '<span class="nav-hub-pill">' + n[1] + '</span>' : n[1];
      return '<a href="' + href + '"' + cur(href) + ' class="nav-link m-3 text-white font-semibold">' + inner + '</a>';
    }).join('\n    ');
  }
  function mobileLinks() {
    return NAV.map(function (n) {
      var href = pageLink(n[0]);
      var inner = n[0] === 'hub.html' ? '<span class="nav-hub-pill">' + n[1] + '</span>' : n[1];
      return '<a href="' + href + '"' + cur(href) + ' class="nav-link py-3 text-white font-semibold">' + inner + '</a>';
    }).join('\n      ');
  }

  var headerHTML =
    '<a class="skip-link" href="#main-content">Skip to content</a>' +
    '<header class="fixed top-0 left-0 right-0 z-50 bg-[#293B66] border-b border-white/10 transition-all duration-300">' +
    '<div id="site-header-row" class="row1 flex justify-between px-5 py-3">' +
      '<div class="col1 flex items-center">' +
        '<img src="' + assetPath('images/logo-white.png') + '" alt="Cime Tech Ecosystem logo" class="w-6 h-auto">' +
        '<p class="brand-name font-bold text-white text-sm leading-tight px-2">Cime Tech <br> Ecosystem Ltd.</p>' +
      '</div>' +
      '<div class="col2 hidden xl:block">' + desktopLinks() + '</div>' +
      '<div class="col3 hidden xl:block">' +
        '<a href="' + pageLink('book-tour.html') + '" class="m-3 text-white font-semibold bg-[#762837] p-3 rounded-3xl">Book a Hub Tour</a>' +
        '<a href="' + pageLink('start-project.html') + '" class="m-3 text-white font-semibold border rounded-3xl border-white p-3">Start a Project</a>' +
      '</div>' +
      '<button type="button" id="menu-toggle" class="xl:hidden self-center text-white p-1" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">' +
        '<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">' +
          '<path id="menu-icon-open" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/>' +
          '<path id="menu-icon-close" class="hidden" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/>' +
        '</svg>' +
      '</button>' +
    '</div>' +
    '<nav id="mobile-menu" class="hidden xl:hidden bg-[#293B66] border-t border-white/10 px-5 pb-5 overflow-y-auto" aria-label="Main">' +
      '<div class="flex flex-col">' + mobileLinks() + '</div>' +
      '<div class="mt-3 flex flex-wrap gap-3">' +
        '<a href="' + pageLink('book-tour.html') + '" class="text-white font-semibold bg-[#762837] px-5 py-3 rounded-3xl">Book a Hub Tour</a>' +
        '<a href="' + pageLink('start-project.html') + '" class="text-white font-semibold border rounded-3xl border-white px-5 py-3">Start a Project</a>' +
      '</div>' +
    '</nav>' +
    '</header>';

  /* ---------- Footer ---------- */
  var footerHTML =
    '<footer class="bg-[#182340] text-white py-12">' +
      '<div class="max-w-[1240px] mx-auto px-6 flex flex-wrap justify-between gap-10">' +
        '<div class="max-w-xs">' +
          '<div class="flex"><img src="' + assetPath('images/logo-white.png') + '" alt="Cime Tech Ecosystem logo" class="w-12 h-auto"><p class="brand-name font-bold px-2">Cime Tech <br> Ecosystem Ltd.</p></div>' +
          '<p class="mt-4 text-[#D4D0C4]">Where Technology and Community Reach the Summit.</p>' +
        '</div>' +
        '<nav class="flex flex-col gap-2 font-semibold" aria-label="Footer">' +
          NAV.map(function (n) { return '<a href="' + pageLink(n[0]) + '"' + cur(pageLink(n[0])) + '>' + n[1] + '</a>'; }).join('') +
        '</nav>' +
        '<div class="flex flex-col gap-2">' +
          '<a href="tel:' + CIME.phoneTel + '" class="hover:text-[#D4D0C4]">' + CIME.phoneDisplay + '</a>' +
          '<a href="' + wa(CIME.tourMessage) + '" class="hover:text-[#D4D0C4]">WhatsApp</a>' +
          '<a href="mailto:' + CIME.email + '" class="hover:text-[#D4D0C4] break-all">' + CIME.email + '</a>' +
        '</div>' +
      '</div>' +
      '<p class="mt-10 px-6 text-center text-sm text-[#D4D0C4]">&copy; 2026 Cime Tech Ecosystem Ltd. All rights reserved. &nbsp;|&nbsp; <a href="' + pageLink('privacy.html') + '"' + cur(pageLink('privacy.html')) + ' class="underline underline-offset-4">Privacy Policy</a></p>' +
    '</footer>';

  function inject(id, html) {
    var el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }
  inject('site-header', headerHTML);
  inject('site-footer', footerHTML);

  var headerEl = document.querySelector('header');

  /* ---------- Mobile menu ---------- */
  (function () {
    var btn = document.getElementById('menu-toggle'),
        menu = document.getElementById('mobile-menu'),
        iconOpen = document.getElementById('menu-icon-open'),
        iconClose = document.getElementById('menu-icon-close');
    if (!btn || !menu) return;
    function setOpen(open) {
      menu.classList.toggle('hidden', !open);
      iconOpen.classList.toggle('hidden', open);
      iconClose.classList.toggle('hidden', !open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      headerEl.classList.toggle('menu-open', open);
    }
    btn.addEventListener('click', function () { setOpen(menu.classList.contains('hidden')); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1280) setOpen(false); });
  })();

  /* ---------- Floating contact button ---------- */
  (function () {
    var fab = document.createElement('div');
    fab.className = 'fab';
    fab.innerHTML =
      '<div class="fab-items">' +
        '<a class="fab-btn" href="' + wa(CIME.tourMessage) + '" aria-label="Chat with us on WhatsApp" target="_blank" rel="noopener">' + iconWA + '</a>' +
        '<a class="fab-btn" href="tel:' + CIME.phoneTel + '" aria-label="Call ' + CIME.phoneDisplay + '">' + iconPhone + '</a>' +
      '</div>' +
      '<button type="button" class="fab-btn fab-toggle" aria-label="Open contact options" aria-expanded="false">' + iconChat + '</button>';
    document.body.appendChild(fab);
    var t = fab.querySelector('.fab-toggle');
    t.addEventListener('click', function () {
      var open = !fab.classList.contains('open');
      fab.classList.toggle('open', open);
      t.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  })();

  /* ---------- Scroll effects: solid header, contour movement, elevation gauge ---------- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var gauge, gaugeNow, gaugeFill, camps = [];

  (function buildGauge() {
    var sections = Array.prototype.slice.call(document.querySelectorAll('main section'));
    if (sections.length < 2) return;
    gauge = document.createElement('div');
    gauge.className = 'gauge';
    gauge.setAttribute('aria-hidden', 'true');
    gauge.innerHTML = '<div class="gauge-line"></div><div class="gauge-fill"></div>' +
      '<span class="gauge-label gauge-top">2,400m</span><span class="gauge-label gauge-bottom">ELEV 0m</span>' +
      '<span class="gauge-label gauge-now">ELEV 0m</span>';
    sections.forEach(function (s, i) {
      var c = document.createElement('span');
      c.className = 'gauge-camp';
      c._section = s; c._i = i;
      gauge.appendChild(c); camps.push(c);
    });
    document.body.appendChild(gauge);
    gaugeNow = gauge.querySelector('.gauge-now');
    gaugeFill = gauge.querySelector('.gauge-fill');
  })();

  function maxScroll() { return Math.max(1, document.documentElement.scrollHeight - window.innerHeight); }
  function placeCamps() {
    var m = maxScroll();
    camps.forEach(function (c) {
      var y = c._section.getBoundingClientRect().top + window.scrollY;
      c.style.top = Math.min(100, Math.max(0, (y / m) * 100)) + '%';
      c.title = 'Camp ' + (c._i + 1);
    });
  }

  var ticking = false;
  function onScroll() {
    var y = window.scrollY || 0;
    if (headerEl) headerEl.classList.toggle('header-solid', y > 24);
    if (!reduce) document.documentElement.style.setProperty('--cy', (-y * 0.05).toFixed(1) + 'px');
    if (gauge) {
      var p = Math.min(1, Math.max(0, y / maxScroll()));
      var elev = Math.round((p * 2400) / 10) * 10;
      gaugeNow.style.top = (p * 100) + '%';
      gaugeFill.style.height = (p * 100) + '%';
      gaugeNow.textContent = 'ELEV ' + elev.toLocaleString('en-US') + 'm';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', function () { placeCamps(); onScroll(); });
  window.addEventListener('load', function () { placeCamps(); onScroll(); });
  placeCamps(); onScroll();

  /* ---------- Analytics (switches on when an ID is set above) ---------- */
  window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments); };
  if (CIME.plausibleDomain) {
    var ps = document.createElement('script');
    ps.defer = true; ps.setAttribute('data-domain', CIME.plausibleDomain);
    ps.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(ps);
  }
  if (CIME.ga4Id) {
    var gs = document.createElement('script');
    gs.async = true; gs.src = 'https://www.googletagmanager.com/gtag/js?id=' + CIME.ga4Id;
    document.head.appendChild(gs);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date()); window.gtag('config', CIME.ga4Id);
  }
  window.cimeTrack = function (name, props) {
    try {
      if (CIME.plausibleDomain && window.plausible) window.plausible(name, { props: props || {} });
      if (CIME.ga4Id && window.gtag) window.gtag('event', name.toLowerCase().replace(/\s+/g, '_'), props || {});
    } catch (e) { /* never block the page */ }
  };
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('book-tour') === 0) window.cimeTrack('Book a Tour Click', { from: page });
    else if (href.indexOf('start-project') === 0) window.cimeTrack('Start a Project Click', { from: page });
    else if (href.indexOf('https://wa.me') === 0) window.cimeTrack('WhatsApp Tap', { from: page });
    else if (href.indexOf('tel:') === 0) window.cimeTrack('Phone Tap', { from: page });
  });
  var pricing = document.getElementById('pricing');
  if (pricing && 'IntersectionObserver' in window) {
    var seen = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting && !pricing.hidden) { window.cimeTrack('Pricing View'); seen.disconnect(); } });
    }, { threshold: 0.3 });
    seen.observe(pricing);
  }
})();
