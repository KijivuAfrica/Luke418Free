/* ============================================================
   HEAVENLY TALES — Main Page (index.html)
   ============================================================ */

const STORAGE = {
  SUBSCRIBED:   'heavenly_subscribed',
  TRIAL_START:  'heavenly_trial_start',
  EMAIL:        'heavenly_email',
  STORIES:      'heavenly_stories',
  AGE:          'heavenly_age',
};

const AGE_LABELS = {
  tiny:      'Tiny Ones (2–4)',
  explorers: 'Explorers (5–8)',
  seekers:   'Seekers (9–12)',
};

// Animation HTML templates keyed by animationType
const ANIM_TEMPLATES = {
  stars: `
    <div class="anim-container anim-stars">
      <span class="star star-1">⭐</span>
      <span class="star star-2">✨</span>
      <span class="star star-3">⭐</span>
      <span class="star star-4">💫</span>
      <span class="star star-5">⭐</span>
      <span class="star star-6">✨</span>
    </div>`,

  waves: `
    <div class="anim-container anim-waves">
      <div class="wave-wrap">
        <svg class="wave-svg" viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,35 C180,0 360,70 540,35 C720,0 900,70 1080,35 C1260,0 1440,70 1440,35 L1440,70 L0,70 Z" fill="rgba(91,192,235,0.35)"/>
        </svg>
      </div>
      <div class="wave-wrap" style="bottom:10px;opacity:0.4;">
        <svg class="wave-svg wave-svg-2" viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,35 C180,70 360,0 540,35 C720,70 900,0 1080,35 C1260,70 1440,0 1440,35 L1440,70 L0,70 Z" fill="rgba(123,198,126,0.35)"/>
        </svg>
      </div>
      <span class="boat">⛵</span>
    </div>`,

  sling: `
    <div class="anim-container anim-sling">
      <span class="sling-hero">🏹</span>
      <span class="stone">🪨</span>
      <span class="hill hill-l">⛰️</span>
      <span class="hill hill-r">🌿</span>
    </div>`,

  doves: `
    <div class="anim-container anim-doves">
      <span class="dove dove-1">🕊️</span>
      <span class="dove dove-2">🕊️</span>
      <span class="dove dove-3">🕊️</span>
    </div>`,

  rainbow: `
    <div class="anim-container anim-rainbow">
      <div class="rainbow-arc"></div>
      <span class="cloud cloud-1">☁️</span>
      <span class="cloud cloud-2">☁️</span>
    </div>`,

  fire: `
    <div class="anim-container anim-fire">
      <span class="bush">🌿</span>
      <span class="flame flame-1">🔥</span>
      <span class="flame flame-2">🔥</span>
      <span class="flame flame-3">✨</span>
    </div>`,

  fish: `
    <div class="anim-container anim-fish">
      <span class="fish fish-1">🐟</span>
      <span class="fish fish-2">🐠</span>
      <span class="fish fish-3">🐡</span>
    </div>`,

  crown: `
    <div class="anim-container anim-crown">
      <span class="crown-icon">👑</span>
      <span class="sparkle sp-1">✨</span>
      <span class="sparkle sp-2">⭐</span>
      <span class="sparkle sp-3">✨</span>
      <span class="sparkle sp-4">💛</span>
    </div>`,

  cross: `
    <div class="anim-container anim-cross">
      <span class="cross-icon">✝️</span>
      <span class="sparkle sp-1">✨</span>
      <span class="sparkle sp-2">💛</span>
      <span class="sparkle sp-3">✨</span>
      <span class="sparkle sp-4">🌟</span>
    </div>`,

  sheep: `
    <div class="anim-container anim-sheep">
      <div class="green-hill"></div>
      <span class="sheep sheep-1">🐑</span>
      <span class="sheep sheep-2">🐑</span>
      <span class="sheep sheep-3">🐏</span>
    </div>`,

  bread: `
    <div class="anim-container anim-bread">
      <span class="bread-icon bread-1">🍞</span>
      <span class="bread-icon bread-2">🫓</span>
      <span class="bread-icon bread-3">🐟</span>
    </div>`,

  boat: `
    <div class="anim-container anim-waves" style="background:linear-gradient(160deg,#DBEAFE 0%,#D1FAE5 100%);">
      <div class="wave-wrap">
        <svg class="wave-svg" viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,35 C180,0 360,70 540,35 C720,0 900,70 1080,35 C1260,0 1440,70 1440,35 L1440,70 L0,70 Z" fill="rgba(91,192,235,0.4)"/>
        </svg>
      </div>
      <span class="boat">⛵</span>
    </div>`,
};

// Header gradient by animation type
const HEADER_GRADIENTS = {
  stars:    'linear-gradient(160deg, #C8D8FF 0%, #E8D5FF 100%)',
  waves:    'linear-gradient(160deg, #A8D5E2 0%, #B2EAE8 100%)',
  sling:    'linear-gradient(160deg, #FFE4A3 0%, #F5D070 100%)',
  doves:    'linear-gradient(160deg, #FCE4D6 0%, #D6EAF8 100%)',
  rainbow:  'linear-gradient(160deg, #FFF0D6 0%, #D6F0FF 100%)',
  fire:     'linear-gradient(160deg, #FFD4A3 0%, #FFE08A 100%)',
  fish:     'linear-gradient(160deg, #B2EAE8 0%, #90CDF4 100%)',
  crown:    'linear-gradient(160deg, #FFE08A 0%, #FFF5D1 100%)',
  cross:    'linear-gradient(160deg, #FDE8EF 0%, #FDF0F5 100%)',
  sheep:    'linear-gradient(160deg, #E8F5E9 0%, #FFF8E7 100%)',
  bread:    'linear-gradient(160deg, #FFF3CD 0%, #FFE08A 100%)',
  boat:     'linear-gradient(160deg, #DBEAFE 0%, #D1FAE5 100%)',
};

// ── DOM Refs ────────────────────────────────────────────────
const paywallOverlay  = document.getElementById('paywall-overlay');
const paywallError    = document.getElementById('paywall-error');
const paywallCTA      = document.getElementById('paywall-cta');
const paywallEmail    = document.getElementById('paywall-email');
const nightIndicator  = document.getElementById('night-indicator');
const nightNum        = document.getElementById('night-num');
const storyHeader     = document.getElementById('story-header');
const storyTitle      = document.getElementById('story-title');
const storyPassage    = document.getElementById('story-passage');
const loadingState    = document.getElementById('loading-state');
const errorState      = document.getElementById('error-state');
const errorMessage    = document.getElementById('error-message');
const retryBtn        = document.getElementById('retry-btn');
const storySection    = document.getElementById('story-section');
const storyText       = document.getElementById('story-text');
const lessonText      = document.getElementById('lesson-text');
const parentSection   = document.getElementById('parent-section');
const prayerList      = document.getElementById('prayer-list');
const contextText     = document.getElementById('context-text');
const convoText       = document.getElementById('convo-text');
const ageBtns         = document.querySelectorAll('.age-btn');
const planBtns        = document.querySelectorAll('.plan-btn');

let currentAge = localStorage.getItem(STORAGE.AGE) || 'explorers';
let selectedPlan = { id: 'monthly', priceId: 'price_MONTHLY_ID' };

// ── Init ────────────────────────────────────────────────────
function init() {
  setActiveAge(currentAge);
  updateNightIndicator();

  if (!isSubscribed()) {
    showPaywall();
    return;
  }

  loadStory(currentAge);
}

// ── Subscription Checks ─────────────────────────────────────
function isSubscribed() {
  return !!localStorage.getItem(STORAGE.SUBSCRIBED);
}

function updateNightIndicator() {
  const trialStart = localStorage.getItem(STORAGE.TRIAL_START);
  if (!trialStart || !isSubscribed()) return;

  const daysSince = Math.floor((Date.now() - new Date(trialStart)) / 86400000);
  if (daysSince < 5) {
    nightNum.textContent = daysSince + 1;
    nightIndicator.classList.remove('hidden');
  }
}

// ── Paywall ─────────────────────────────────────────────────
function showPaywall() {
  paywallOverlay.classList.remove('hidden');
  paywallEmail.focus();
}

function hidePaywall() {
  paywallOverlay.classList.add('hidden');
}

// Plan selection
planBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    planBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedPlan = {
      id:      btn.dataset.plan,
      priceId: btn.dataset.priceId,
    };
  });
});

// CTA click — create Stripe Checkout
paywallCTA.addEventListener('click', async () => {
  const email = paywallEmail.value.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showPaywallError('Please enter a valid email address.');
    return;
  }

  paywallCTA.disabled = true;
  paywallCTA.textContent = 'Just a moment…';
  hidePaywallError();

  try {
    const res = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, priceId: selectedPlan.priceId }),
    });

    if (!res.ok) throw new Error('Could not start checkout. Please try again.');

    const { url } = await res.json();

    // Save email before redirect so thank-you page can use it
    localStorage.setItem(STORAGE.EMAIL, email);

    window.location.href = url;
  } catch (err) {
    showPaywallError(err.message || 'Something went wrong. Please try again.');
    paywallCTA.disabled = false;
    paywallCTA.textContent = 'Start My Free Trial ✨';
  }
});

function showPaywallError(msg) {
  paywallError.textContent = msg;
  paywallError.classList.add('visible');
}
function hidePaywallError() {
  paywallError.classList.remove('visible');
}

// ── Age Selector ────────────────────────────────────────────
ageBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const age = btn.dataset.age;
    if (age === currentAge) return;
    currentAge = age;
    localStorage.setItem(STORAGE.AGE, age);
    setActiveAge(age);
    if (isSubscribed()) loadStory(age);
  });
});

function setActiveAge(age) {
  ageBtns.forEach(b => {
    const active = b.dataset.age === age;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', active);
  });
}

// ── Story Loading ────────────────────────────────────────────
function todayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function getCachedStory(age) {
  const key = `${todayKey()}-${age}`;
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE.STORIES) || '{}');
    return all[key] || null;
  } catch { return null; }
}

function cacheStory(age, data) {
  const key = `${todayKey()}-${age}`;
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE.STORIES) || '{}');
    all[key] = { ...data, date: todayKey(), ageLevel: age, cachedAt: Date.now() };
    // Keep last 90 days to avoid unbounded localStorage growth
    const keys = Object.keys(all).sort();
    if (keys.length > 90) keys.slice(0, keys.length - 90).forEach(k => delete all[k]);
    localStorage.setItem(STORAGE.STORIES, JSON.stringify(all));
  } catch { /* localStorage full — silently skip */ }
}

async function loadStory(age) {
  showLoading();

  const cached = getCachedStory(age);
  if (cached) {
    renderStory(cached);
    return;
  }

  try {
    const res = await fetch('/api/generate-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: todayKey(), ageLevel: age }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Server error (${res.status})`);
    }

    const data = await res.json();
    cacheStory(age, data);
    renderStory(data);
  } catch (err) {
    showError(err.message || 'Could not load tonight\'s story. Please check your connection and try again.');
  }
}

retryBtn.addEventListener('click', () => loadStory(currentAge));

// ── Rendering ───────────────────────────────────────────────
function showLoading() {
  loadingState.classList.remove('hidden');
  errorState.classList.add('hidden');
  storyHeader.classList.add('hidden');
  storySection.classList.add('hidden');
  parentSection.classList.add('hidden');
}

function showError(msg) {
  loadingState.classList.add('hidden');
  errorMessage.textContent = msg;
  errorState.classList.remove('hidden');
}

function renderStory(data) {
  loadingState.classList.add('hidden');
  errorState.classList.add('hidden');

  // Header
  const animType = data.animationType || 'stars';
  storyHeader.style.background = HEADER_GRADIENTS[animType] || HEADER_GRADIENTS.stars;
  storyHeader.innerHTML = (ANIM_TEMPLATES[animType] || ANIM_TEMPLATES.stars) + `
    <div class="story-header-content">
      <h1 class="story-title-header">${escHtml(data.title || 'Tonight\'s Story')}</h1>
      <span class="story-passage-ref">${escHtml(data.passage || '')}</span>
    </div>`;
  storyHeader.classList.remove('hidden');

  // Story text (split on double newlines → paragraphs)
  const paragraphs = (data.storyText || '')
    .split(/\n{2,}/)
    .map(p => `<p>${escHtml(p.trim())}</p>`)
    .join('');
  storyText.innerHTML = paragraphs;
  lessonText.textContent = data.lesson || '';
  storySection.classList.remove('hidden');

  // Parent section
  prayerList.innerHTML = (data.parentSection?.prayerPoints || [])
    .map(pt => `<li>${escHtml(pt)}</li>`)
    .join('');
  contextText.textContent = data.parentSection?.biblicalContext || '';
  convoText.textContent   = data.parentSection?.conversationStarter || '';
  parentSection.classList.remove('hidden');
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

// ── Start ───────────────────────────────────────────────────
init();
