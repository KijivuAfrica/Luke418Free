/* ============================================================
   Netlify Function: create-checkout
   POST /api/create-checkout
   Body: { email: string, priceId: string }
   Creates a Stripe Checkout Session with a 5-day free trial.
   ============================================================ */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders() };
  }
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { message: 'Method Not Allowed' });
  }

  let email, priceId;
  try {
    ({ email, priceId } = JSON.parse(event.body || '{}'));
  } catch {
    return jsonResponse(400, { message: 'Invalid request body' });
  }

  if (!email || !priceId) {
    return jsonResponse(400, { message: 'email and priceId are required' });
  }

  // Basic email check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse(400, { message: 'Invalid email address' });
  }

  const origin = event.headers.origin
    || event.headers.referer?.replace(/\/[^/]*$/,'')
    || 'https://heavenly-tales.netlify.app';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode:                  'subscription',
      customer_email:        email,
      line_items: [{
        price:    priceId,
        quantity: 1,
      }],
      subscription_data: {
        trial_period_days: 5,
        metadata: { source: 'heavenly-tales', ministry: 'luke418free' },
      },
      success_url: `${origin}/thank-you.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${origin}/`,
      allow_promotion_codes: true,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('create-checkout error:', err);
    return jsonResponse(500, { message: err.message || 'Could not start checkout' });
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
