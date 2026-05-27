/* ============================================================
   HEAVENLY TALES — Prayer Page (prayer.html)
   ============================================================ */

const STORIES_KEY = 'heavenly_stories';
const TRIAL_KEY   = 'heavenly_trial_start';
const SUB_KEY     = 'heavenly_subscribed';

const AGE_LABELS = { tiny: '🌱 Tiny Ones', explorers: '🔍 Explorers', seekers: '⭐ Seekers' };

function init() {
  updateNightIndicator();
  renderPrayers();
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

function getThisWeekStories() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORIES_KEY) || '{}');
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().slice(0, 10);

    return Object.values(raw)
      .filter(s => s.date >= weekAgoStr && s.parentSection?.prayerPoints?.length)
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  } catch {
    return [];
  }
}

function renderPrayers() {
  const stories = getThisWeekStories();
  const grid    = document.getElementById('prayer-grid');
  const empty   = document.getElementById('no-prayers');

  if (!stories.length) {
    empty.classList.remove('hidden');
    return;
  }

  grid.innerHTML = stories.map(s => `
    <div class="prayer-day-card">
      <div class="prayer-day-header">
        <h3>${escHtml(s.title || 'Bible Story')}</h3>
        <span class="prayer-day-date">${formatDate(s.date)} · ${AGE_LABELS[s.ageLevel] || s.ageLevel}</span>
      </div>
      <ul class="prayer-list">
        ${(s.parentSection.prayerPoints || []).map(pt => `<li>${escHtml(pt)}</li>`).join('')}
      </ul>
    </div>`
  ).join('');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric'
    });
  } catch { return dateStr; }
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

init();
