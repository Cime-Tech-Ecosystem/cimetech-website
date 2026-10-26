/* Renders the Hub pricing section from pricing-data.js. Hidden until enabled: true. */
(function () {
  var D = window.CIME_PRICING, sec = document.getElementById('pricing'), legacy = document.getElementById('plans-legacy');
  if (!D || !sec) return;
  if (!D.enabled) { sec.hidden = true; return; }
  if (legacy) legacy.hidden = true;
  sec.hidden = false;

  var annual = false;
  var yr = D.discounts.filter(function (d) { return d.months === 12; })[0];
  var annualPct = yr ? yr.percent : 0;

  function money(n) { return D.currency + Number(n).toLocaleString('en-NG'); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
  function list(items) { return '<ul class="mt-4 space-y-2 text-[#141b2e]">' + items.map(function (i) { return '<li class="flex gap-2"><span class="text-[#336b64]" aria-hidden="true">&#9650;</span>' + esc(i) + '</li>'; }).join('') + '</ul>'; }

  function priceBlock(p) {
    if (p.price == null) return '<p class="price-amount">Request a quote</p>';
    var shown = p.price, old = '';
    if (annual && p.monthly && annualPct) { shown = Math.round(p.price * (1 - annualPct / 100)); old = '<span class="price-old mr-2">' + money(p.price) + '</span>'; }
    return '<p class="price-amount">' + old + (p.from ? 'From ' : '') + money(shown) + '</p>';
  }
  function cta() { return '<a href="book-tour.html" class="inline-block mt-5 text-white font-semibold bg-[#762837] px-6 py-3 rounded-3xl">Book a Hub Tour</a>'; }

  function render() {
    var html = '';
    html += '<div class="flex flex-wrap items-center gap-4 mt-8">' +
      '<div class="price-switch" role="group" aria-label="Billing period">' +
      '<button type="button" data-mode="monthly" aria-pressed="' + (!annual) + '">Monthly</button>' +
      '<button type="button" data-mode="annual" aria-pressed="' + annual + '">Annual' + (annualPct ? ' (save ' + annualPct + '%)' : '') + '</button></div>' +
      '<p class="text-[#141b2e]">Longer commitments on monthly plans: ' +
      D.discounts.map(function (d) { return d.percent + '% for ' + d.months + ' months'; }).join(', ') + '.</p></div>';

    html += '<div class="flex flex-wrap justify-center gap-6 mt-10">';
    D.plans.forEach(function (p) {
      html += '<div class="w-full md:w-[30%] rounded-2xl border border-[#d4d0c4] bg-white p-6 card-lift card-accent' + (p.recommended ? ' ring-2 ring-[#336b64]' : '') + '">' +
        '<p class="text-sm tracking-widest text-[#336b64]">' + (p.recommended ? 'RECOMMENDED' : 'PLAN') + '</p>' +
        '<h3 class="mt-2 text-2xl font-bold text-[#293b66]">' + esc(p.name) + '</h3>' +
        '<div class="mt-3">' + priceBlock(p) + '<p class="text-sm text-[#141b2e]">' + esc(annual && p.monthly ? 'per month, billed annually' : p.billing) + '</p></div>' +
        list(p.includes) + cta() + '</div>';
    });
    html += '</div>';

    html += '<h3 class="mt-14 text-3xl max-sm:text-2xl font-bold text-[#293b66]">Meeting Rooms <span class="text-[#762837]">&amp; Event Space</span></h3>';
    html += '<div class="flex flex-wrap justify-center gap-6 mt-8">';
    D.rooms.forEach(function (r) {
      html += '<div class="w-full md:w-[45%] rounded-2xl border border-[#d4d0c4] bg-white p-6 card-lift card-accent">' +
        '<h3 class="text-2xl font-bold text-[#293b66]">' + esc(r.name) + '</h3><dl class="mt-4 space-y-2">' +
        r.rates.map(function (x) { return '<div class="flex justify-between gap-4 border-b border-[#d4d0c4] pb-2"><dt class="text-[#141b2e]">' + esc(x.label) + '</dt><dd class="font-bold text-[#293b66]">' + (x.price == null ? 'Request a quote' : money(x.price)) + '</dd></div>'; }).join('') +
        '</dl>' + list(r.includes) + cta() + '</div>';
    });
    html += '</div>';

    if (D.addons && D.addons.length) {
      html += '<h3 class="mt-14 text-2xl font-bold text-[#293b66]">Optional add-ons</h3><div class="mt-4 text-[#141b2e]">' + list(D.addons) + '</div>';
    }
    if (D.vat && D.vat.included !== null) {
      html += '<p class="mt-8 text-sm text-[#141b2e]">' + (D.vat.included ? 'All prices include VAT.' : 'All prices exclude VAT.') + '</p>';
    }
    document.getElementById('pricing-body').innerHTML = html;
    Array.prototype.forEach.call(document.querySelectorAll('.price-switch button'), function (b) {
      b.addEventListener('click', function () { annual = b.getAttribute('data-mode') === 'annual'; render(); var n = document.querySelector('.price-switch button[aria-pressed="true"]'); if (n) n.focus(); });
    });
  }
  render();
})();
