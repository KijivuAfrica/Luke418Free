/* ── HEADER SHADOW ON SCROLL ── */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── FAQ ACCORDION ── */
document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all
    document.querySelectorAll('.faq-question').forEach((b) => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });

    // Open clicked if it was closed
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('open');
    }
  });
});

/* ── UTM PASSTHROUGH ── */
// Appends any UTM params from the current URL to all Amazon links
(function () {
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const hasUtm = utmKeys.some((k) => params.has(k));

  if (hasUtm) {
    document.querySelectorAll('a[href*="amazon.com"]').forEach((a) => {
      try {
        const url = new URL(a.href);
        utmKeys.forEach((k) => { if (params.has(k)) url.searchParams.set(k, params.get(k)); });
        a.href = url.toString();
      } catch (_) {}
    });
  }
})();
