/* ============================================================
   Netlify Function: generate-story
   POST /api/generate-story
   Body: { date: "YYYY-MM-DD", ageLevel: "tiny"|"explorers"|"seekers" }
   ============================================================ */

const Anthropic = require('@anthropic-ai/sdk');

const AGE_CONFIGS = {
  tiny: {
    label:     'Tiny Ones',
    range:     '2 to 4',
    wordCount: '250 to 350',
    style:     'Use very simple words a 3-year-old knows. Short sentences of 6 words or fewer. Gentle repetition of key phrases. Warm, cozy, safe tone. Focus on God\'s love and kindness.',
    address:   '"little one" or "sweet heart"',
    lesson:    'one single sentence, simple and memorable, like "God loves you so much!"',
  },
  explorers: {
    label:     'Explorers',
    range:     '5 to 8',
    wordCount: '500 to 650',
    style:     'Clear vocabulary, short paragraphs, exciting narrative with adventure. Mix action and wonder. Focus on faith, courage, and obeying God.',
    address:   '"young explorer" or "brave one"',
    lesson:    'two to three sentences with a clear application for a young child',
  },
  seekers: {
    label:     'Seekers',
    range:     '9 to 12',
    wordCount: '700 to 900',
    style:     'Richer vocabulary, nuanced character development, deeper theological themes. Ask real questions. Help them wrestle with what faith means in real life.',
    address:   '"young seeker" or "dear friend"',
    lesson:    'three to four sentences with substance and real-world application',
  },
};

const VALID_ANIM_TYPES = [
  'stars','waves','sling','doves','rainbow','fire','fish','crown','cross','sheep','bread','boat'
];

const SYSTEM_PROMPT = `You are a gifted Christian children's storyteller who writes warm, engaging Bible stories for bedtime. Your stories are biblically accurate, age-appropriate, and help children fall in love with God's word. You write with warmth, wonder, and gentle wisdom — like sitting with a loving grandmother who knows Scripture deeply. You always return valid JSON and nothing else.`;

exports.handler = async (event) => {
  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders() };
  }
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { message: 'Method Not Allowed' });
  }

  let date, ageLevel;
  try {
    ({ date, ageLevel } = JSON.parse(event.body || '{}'));
  } catch {
    return jsonResponse(400, { message: 'Invalid request body' });
  }

  if (!date || !ageLevel || !AGE_CONFIGS[ageLevel]) {
    return jsonResponse(400, { message: 'Missing or invalid date / ageLevel' });
  }

  const cfg = AGE_CONFIGS[ageLevel];

  const userPrompt = `Tonight is ${date}. Write a bedtime Bible story for ${cfg.label} children, ages ${cfg.range}.

STYLE: ${cfg.style}

REQUIREMENTS:
1. Choose a rich biblical narrative. Use the date "${date}" as a seed for variety — cover different parts of the Bible across different nights.
2. Story length: ${cfg.wordCount} words.
3. Speak directly to the child warmly at least once, using the address ${cfg.address}.
4. End with a faith lesson: ${cfg.lesson}.
5. Parent section: write as a warm friend, not a textbook. Be practical and specific.
6. Prayer points: three specific, heartfelt prayers focused on the child's spiritual growth this week — not generic.
7. Biblical context: 2–3 sentences explaining the historical or cultural setting simply.
8. Conversation starter: one warm, open-ended question the parent can ask tonight at bedtime.
9. Choose animationType that best matches the story theme. Options: ${VALID_ANIM_TYPES.join(', ')}.

Return ONLY valid JSON in EXACTLY this format — no markdown, no code fences, just the raw JSON object:

{
  "title": "The story title",
  "passage": "Book Chapter:Verses",
  "animationType": "one_of_the_valid_types",
  "storyText": "The full story. Use two newlines between paragraphs.",
  "lesson": "The faith lesson.",
  "parentSection": {
    "prayerPoints": [
      "First specific prayer point...",
      "Second specific prayer point...",
      "Third specific prayer point..."
    ],
    "biblicalContext": "Brief context about the passage...",
    "conversationStarter": "A warm question for tonight..."
  }
}`;

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model:      'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system:     SYSTEM_PROMPT,
      messages:   [{ role: 'user', content: userPrompt }],
    });

    const rawText = message.content[0]?.text || '';

    // Strip markdown code fences if model wrapped the JSON
    const cleaned = rawText.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'').trim();

    let story;
    try {
      story = JSON.parse(cleaned);
    } catch {
      return jsonResponse(500, { message: 'Story generation returned invalid JSON. Please retry.' });
    }

    // Sanitise animationType
    if (!VALID_ANIM_TYPES.includes(story.animationType)) {
      story.animationType = 'stars';
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
      body: JSON.stringify(story),
    };

  } catch (err) {
    console.error('generate-story error:', err);
    return jsonResponse(500, { message: 'Could not generate story. Please try again.' });
  }
};

function jsonResponse(status, body) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    body: JSON.stringify(body),
  };
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}
