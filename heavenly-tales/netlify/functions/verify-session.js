/* ============================================================
   Netlify Function: verify-session
   POST /api/verify-session
   Body: { sessionId: string }
   Verifies a Stripe Checkout session and returns trial details.
   ============================================================ */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders() };
  }
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { message: 'Method Not Allowed' });
  }

  let sessionId;
  try {
    ({ sessionId } = JSON.parse(event.body || '{}'));
  } catch {
    return jsonResponse(400, { message: 'Invalid request body' });
  }

  if (!sessionId) {
    return jsonResponse(400, { message: 'sessionId is required' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer'],
    });

    if (session.status !== 'complete') {
      return jsonResponse(200, { success: false, message: 'Payment not yet complete' });
    }

    const subscription = session.subscription;
    const trialEnd     = subscription?.trial_end || null; // Unix timestamp (seconds)
    const email        = session.customer_details?.email
                       || (typeof session.customer === 'object' ? session.customer?.email : null)
                       || null;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
      body: JSON.stringify({
        success:  true,
        email,
        trialEnd, // null if subscription immediately active (no trial)
        plan:     subscription?.items?.data?.[0]?.price?.nickname || 'Heavenly Tales',
      }),
    };
  } catch (err) {
    console.error('verify-session error:', err);
    return jsonResponse(500, { success: false, message: err.message });
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
