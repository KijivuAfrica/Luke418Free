/* ============================================================
   HEAVENLY TALES — Archive Page (archive.html)
   ============================================================ */

const STORIES_KEY = 'heavenly_stories';
const TRIAL_KEY   = 'heavenly_trial_start';
const SUB_KEY     = 'heavenly_subscribed';

const AGE_LABELS = { tiny: '🌱 Tiny Ones', explorers: '🔍 Explorers', seekers: '⭐ Seekers' };

let currentFilter = 'all';
let allStories    = [];

// ── Init ────────────────────────────────────────────────────
function init() {
  updateNightIndicator();
  loadStories();
  setupFilters();
  setupModal();
}

function updateNightIndicator() {
  const trialStart = localStorage.getItem(TRIAL_KEY);
  if (!trialStart || !localStorage.getItem(SUB_KEY)) return;
  const daysSince = Math.floor((Date.now() - new Date(trialStart)) / 86400000);
  if (daysSince < 5) {
    document.getElementById('night-num').textContent = daysSince + 1;
    document.getElementById('night-indicator').classList.remove('hidden');
  }
}

function loadStories() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORIES_KEY) || '{}');
    allStories = Object.values(raw).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  } catch {
    allStories = [];
  }
  renderGrid(allStories);
}

function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filtered = currentFilter === 'all'
        ? allStories
        : allStories.filter(s => s.ageLevel === currentFilter);
      renderGrid(filtered);
    });
  });
}

function renderGrid(stories) {
  const grid  = document.getElementById('archive-grid');
  const empty = document.getElementById('empty-archive');

  if (!stories.length) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  grid.innerHTML = stories.map((s, i) => `
    <div class="archive-card" role="listitem" tabindex="0" data-idx="${i}"
         aria-label="${escHtml(s.title || 'Story')} — ${formatDate(s.date)}">
      <p class="archive-date">${formatDate(s.date)}</p>
      <h3>${escHtml(s.title || 'Bible Story')}</h3>
      <p style="font-size:0.88rem;color:var(--text-soft);margin-bottom:8px;">${escHtml(s.passage || '')}</p>
      <span class="archive-age">${AGE_LABELS[s.ageLevel] || s.ageLevel}</span>
    </div>`
  ).join('');

  // Attach click and keyboard events
  grid.querySelectorAll('.archive-card').forEach(card => {
    const idx = parseInt(card.dataset.idx);
    const story = stories[idx];
    card.addEventListener('click', () => openModal(story));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(story); }
    });
  });
}

// ── Modal ───────────────────────────────────────────────────
function setupModal() {
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('story-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(story) {
  const modal = document.getElementById('story-modal');

  document.getElementById('modal-date').textContent   = formatDate(story.date) + ' · ' + (AGE_LABELS[story.ageLevel] || '');
  document.getElementById('modal-title').textContent  = story.title || '';
  document.getElementById('modal-passage').textContent = story.passage || '';

  const paragraphs = (story.storyText || '')
    .split(/\n{2,}/)
    .map(p => `<p>${escHtml(p.trim())}</p>`)
    .join('');
  document.getElementById('modal-text').innerHTML = paragraphs;
  document.getElementById('modal-lesson').textContent = story.lesson || '';

  const prayerList = document.getElementById('modal-prayers');
  prayerList.innerHTML = (story.parentSection?.prayerPoints || [])
    .map(pt => `<li>${escHtml(pt)}</li>`).join('');

  document.getElementById('modal-context').textContent = story.parentSection?.biblicalContext || '';
  document.getElementById('modal-convo').textContent   = story.parentSection?.conversationStarter || '';

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  document.getElementById('modal-close').focus();
}

function closeModal() {
  document.getElementById('story-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

// ── Utils ────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
      weekday: 'short', month: 'long', day: 'numeric', year: 'numeric'
    });
  } catch { return dateStr; }
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

init();
