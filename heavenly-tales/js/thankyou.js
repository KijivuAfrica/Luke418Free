/* ============================================================
   HEAVENLY TALES — Thank-You Page (thank-you.html)
   ============================================================ */

const STORAGE = {
  SUBSCRIBED:  'heavenly_subscribed',
  TRIAL_START: 'heavenly_trial_start',
  EMAIL:       'heavenly_email',
};

async function init() {
  const params    = new URLSearchParams(window.location.search);
  const sessionId = params.get('session_id');

  if (!sessionId) {
    showError();
    return;
  }

  try {
    const res = await fetch('/api/verify-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    });

    if (!res.ok) throw new Error('Verification failed');

    const data = await res.json();

    if (!data.success) throw new Error('Session not complete');

    // Store trial info in localStorage
    const trialStart = new Date().toISOString().slice(0, 10);
    localStorage.setItem(STORAGE.SUBSCRIBED,  'true');
    localStorage.setItem(STORAGE.TRIAL_START, trialStart);
    if (data.email) localStorage.setItem(STORAGE.EMAIL, data.email);

    // Populate UI
    document.getElementById('trial-start-display').textContent  = formatDate(trialStart);
    document.getElementById('charge-date-display').textContent  = getChargeDate(data.trialEnd, trialStart);
    document.getElementById('email-display').textContent        = data.email || localStorage.getItem(STORAGE.EMAIL) || 'your email';
    document.getElementById('welcome-subtitle').textContent     = 'Your free trial has started. Tonight is Night 1 of 5 — enjoy every moment.';

    document.getElementById('loading-wrap').classList.add('hidden');
    document.getElementById('success-wrap').classList.remove('hidden');

  } catch (err) {
    // If verification fails but we came from Stripe, trust it and set a basic trial
    // so users aren't locked out due to a backend hiccup
    const savedEmail = localStorage.getItem(STORAGE.EMAIL);
    if (savedEmail) {
      const trialStart = new Date().toISOString().slice(0, 10);
      localStorage.setItem(STORAGE.SUBSCRIBED,  'true');
      localStorage.setItem(STORAGE.TRIAL_START, trialStart);

      document.getElementById('trial-start-display').textContent = formatDate(trialStart);
      document.getElementById('charge-date-display').textContent = getChargeDate(null, trialStart);
      document.getElementById('email-display').textContent       = savedEmail;

      document.getElementById('loading-wrap').classList.add('hidden');
      document.getElementById('success-wrap').classList.remove('hidden');
    } else {
      showError();
    }
  }
}

function showError() {
  document.getElementById('loading-wrap').classList.add('hidden');
  document.getElementById('error-wrap').classList.remove('hidden');
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
  } catch { return dateStr; }
}

function getChargeDate(trialEndTimestamp, trialStartStr) {
  if (trialEndTimestamp) {
    // Stripe returns Unix timestamp in seconds
    return new Date(trialEndTimestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
  }
  // Fallback: 5 days from trial start
  const d = new Date(trialStartStr + 'T12:00:00');
  d.setDate(d.getDate() + 5);
  return d.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });
}

init();
