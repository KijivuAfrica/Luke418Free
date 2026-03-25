import { useState } from 'react'

const KLAVIYO_PUBLIC_KEY = import.meta.env.VITE_KLAVIYO_PUBLIC_KEY || 'Xmx8KD'
const KLAVIYO_LIST_ID = import.meta.env.VITE_KLAVIYO_LIST_ID || ''

const faqs = [
  {
    q: 'What should I do right after losing my job?',
    a: 'Give yourself permission to feel the loss. Job loss is a grief — and rushing past it rarely helps. The Waiting Room is designed to help you process the emotions, ground yourself in scripture, and listen for what God is saying before you rush into action.',
  },
  {
    q: "How do I trust God when I'm unemployed and scared?",
    a: 'Fear during unemployment is completely normal. This journal uses guided prompts and scripture to help you bring your fear honestly to God — and practice trusting Him one day at a time.',
  },
  {
    q: 'Is there a Christian journal specifically for unemployment?',
    a: 'Yes — The Waiting Room is written specifically for people working through job loss. Each day includes a scripture, guided reflection prompts, and open space to write and pray. The first 3 days are completely free.',
  },
  {
    q: 'Can God really speak to me during a season of unemployment?',
    a: 'Absolutely. In Luke 4:18, Jesus announces freedom for the oppressed and good news for the poor — and unemployment can feel like both. The Waiting Room is built on the belief that the season of waiting is also a season of hearing. God is still speaking.',
  },
]

const socials = [
  {
    label: 'Instagram',
    handle: '@luke418_free',
    href: 'https://www.instagram.com/luke418_free/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    handle: '@luke418free',
    href: 'https://www.tiktok.com/@luke418free',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    handle: 'Luke418',
    href: 'https://www.facebook.com/Luke418',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

export default function LandingPage({ onSuccess }) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!KLAVIYO_LIST_ID || KLAVIYO_LIST_ID === 'YOUR_LIST_ID_HERE') {
      setError('Setup required: add your Klaviyo List ID to the .env file.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(
        `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_PUBLIC_KEY}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'revision': '2024-02-15',
          },
          body: JSON.stringify({
            data: {
              type: 'subscription',
              attributes: {
                custom_source: 'Luke418Free Website',
                list_id: KLAVIYO_LIST_ID,
                profile: {
                  data: {
                    type: 'profile',
                    attributes: { email, first_name: firstName },
                  },
                },
              },
            },
          }),
        }
      )

      if (res.ok || res.status === 202) {
        onSuccess()
      } else {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.errors?.[0]?.detail || 'Subscription failed. Please try again.')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen font-sans bg-cream-50">

      {/* ── NAV ── */}
      <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 md:px-12">
        <img src="/luke418_logo_v4.svg" alt="Luke 4:18 Free Indeed" className="h-14 w-14 object-contain" />
        <a
          href="https://www.amazon.com/dp/B0GRQBC2JP"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-gold-300 hover:text-gold-400 transition-colors border border-gold-500/40 rounded-full px-4 py-1.5"
        >
          Get Full Book →
        </a>
      </nav>

      {/* ── HERO ── */}
      <section
        aria-label="Free 3-day journal offer"
        className="relative min-h-screen flex items-center justify-center bg-ink-900 overflow-hidden px-6 py-28"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gold-600/8 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

          {/* Book cover */}
          <div className="flex justify-center order-2 md:order-1">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gold-500/10 blur-2xl" />
              <img
                src="/waiting_room_last_frame_v2.jpg"
                alt="The Waiting Room — A Journal for People Working Through Unemployment"
                className="relative w-64 md:w-72 rounded-xl shadow-2xl border border-gold-600/20 object-cover"
              />
            </div>
          </div>

          {/* Text + form */}
          <div className="order-1 md:order-2 text-center md:text-left">
            <p className="text-gold-500 text-xs font-semibold uppercase tracking-[0.25em] mb-5">
              Free 3-Day Journal
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              You didn't lose<br />
              <span className="text-gold-400">your purpose.</span><br />
              Just your paycheck.
            </h1>
            <p className="text-stone-300 text-base md:text-lg leading-relaxed mb-8">
              Unemployment can feel like a wilderness — but God is still speaking.
              Get 3 free days of <span className="text-gold-300 font-medium">The Waiting Room</span>,
              a scripture-based journal for people working through job loss who want to hear from God.
            </p>

            <form
              onSubmit={handleSubmit}
              aria-label="Get free journal access"
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-gold-500/20"
            >
              <div className="flex flex-col sm:flex-row gap-3 mb-3">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  aria-label="First name"
                  className="flex-1 px-4 py-3 rounded-xl bg-white text-ink-900 placeholder-stone-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  className="flex-1 px-4 py-3 rounded-xl bg-white text-ink-900 placeholder-stone-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
              {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gold-500 hover:bg-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-ink-900 font-bold rounded-xl transition-all text-sm tracking-widest uppercase"
              >
                {loading ? 'Sending...' : 'Get Free Access — 3 Days Free'}
              </button>
              <p className="text-stone-500 text-xs mt-3 text-center">
                No spam. Just 3 days of hope. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section aria-label="What's inside the free journal" className="bg-cream-100 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink-900 text-center mb-4">
            What's inside your free 3 days
          </h2>
          <p className="text-stone-500 text-center mb-12 max-w-lg mx-auto">
            Research shows that expressive writing during hardship reduces anxiety and builds
            clarity. Each day pairs that science with scripture — 10 minutes that can shift everything.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📖',
                title: 'Daily Scripture',
                desc: "Grounding verses that speak directly into the experience of unemployment, waiting, and trusting God's timing.",
              },
              {
                icon: '✍️',
                title: 'Guided Prompts',
                desc: 'Honest questions that help you process the emotions of job loss — and listen for what God is saying into it.',
              },
              {
                icon: '🕊️',
                title: 'Space to Hear',
                desc: 'Open journal pages designed to slow you down, write freely, and receive from God in the waiting room.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-cream-200">
                <div className="text-3xl mb-3" aria-hidden="true">{item.icon}</div>
                <h3 className="font-serif text-xl font-semibold text-ink-900 mb-2">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LUKE 4:18 BRAND SECTION ── */}
      <section aria-label="About Luke 4:18" className="bg-white py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <img
            src="/luke418_logo_v4.svg"
            alt="Luke 4:18 Free Indeed"
            className="h-28 w-28 object-contain mx-auto mb-8"
          />
          <p className="text-gold-600 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            The Verse Behind Everything
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink-900 mb-6">
            Luke 4:18
          </h2>
          <div className="w-12 h-px bg-gold-500 mx-auto mb-8" />
          <blockquote className="font-serif text-xl md:text-2xl italic text-stone-700 leading-relaxed mb-8">
            "The Spirit of the Lord is on me, because he has anointed me to proclaim
            good news to the poor. He has sent me to proclaim freedom for the prisoners
            and recovery of sight for the blind, to set the oppressed free,
            to proclaim the year of the Lord's favor."
          </blockquote>
          <p className="text-gold-600 font-semibold tracking-widest text-sm mb-10">— LUKE 4:18–19</p>
          <div className="w-12 h-px bg-gold-500 mx-auto mb-10" />
          <p className="text-stone-600 text-lg leading-relaxed max-w-2xl mx-auto">
            This page exists because unemployment can make you feel like the poor, the prisoner,
            and the oppressed — all at once. But Jesus specifically announced good news for
            people in exactly that place. <span className="text-ink-900 font-semibold">Luke 4:18 Free</span> is
            built on that promise: your waiting room is not the end of your story.
            God is still speaking — and this journal is designed to help you hear Him.
          </p>
        </div>
      </section>

      {/* ── SOCIAL PROOF / WHY IT WORKS ── */}
      <section aria-label="Why this works" className="bg-ink-900 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white text-center mb-4">
            The waiting room is real.<br />
            <span className="text-gold-400">So is what's on the other side.</span>
          </h2>
          <p className="text-stone-400 text-center mb-14 max-w-xl mx-auto">
            You don't have to white-knuckle your way through unemployment. People who process
            their season with intention — through writing, prayer, and scripture — move through
            it differently. Not faster necessarily. But with more clarity, less fear, and a
            stronger sense of what God is saying.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              {
                stat: '10 min',
                label: 'per day',
                desc: "That's all each journal entry takes — low barrier, high impact.",
              },
              {
                stat: '3 days',
                label: 'completely free',
                desc: 'No credit card. No catch. Just you, God, and a journal.',
              },
              {
                stat: '100%',
                label: 'scripture-rooted',
                desc: 'Every prompt is grounded in the Word — not just positive thinking.',
              },
            ].map((item) => (
              <div key={item.stat} className="bg-white/5 border border-gold-500/15 rounded-2xl p-6">
                <p className="font-serif text-4xl font-bold text-gold-400 mb-1">{item.stat}</p>
                <p className="text-gold-600 text-xs uppercase tracking-widest mb-3">{item.label}</p>
                <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT THE BOOK ── */}
      <section aria-label="About The Waiting Room journal" className="bg-cream-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src="/waiting_room_last_frame_v2.jpg"
                alt="The Waiting Room — full journal"
                className="w-56 rounded-xl shadow-2xl border border-cream-200 object-cover"
              />
            </div>
            <div>
              <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">The Full Journal</p>
              <h2 className="font-serif text-3xl font-bold text-ink-900 mb-4">
                The Waiting Room
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                The free 3 days are just the beginning. The full journal contains weeks of
                daily prompts designed to walk you through every stage of the unemployment season —
                from the initial shock, through the uncertainty, to the clarity of what's next.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                People who journal intentionally during hard seasons don't just survive them —
                they emerge with a deeper faith, a clearer sense of purpose, and the confidence
                that God was with them the whole time.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8 font-medium text-ink-800">
                Don't let this season go to waste. The full journal is your guide through it.
              </p>
              <a
                href="https://www.amazon.com/dp/B0GRQBC2JP"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink-900 hover:bg-ink-800 text-gold-400 font-semibold px-6 py-3 rounded-xl transition-colors border border-gold-600/30"
              >
                Get the Full Book on Amazon →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── GET FULL BOOK CTA ── */}
      <section aria-label="Get the full book" className="bg-gold-500 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <p className="text-ink-800 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                Ready to go deeper?
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink-900 mb-5">
                Get the full journal.<br />Transform the waiting.
              </h2>
              <p className="text-ink-800 leading-relaxed mb-4">
                The 3-day free version gives you a taste. The full journal gives you a
                complete road map — weeks of guided scripture, prayer, and reflection to carry
                you from confusion to clarity.
              </p>
              <p className="text-ink-700 text-sm leading-relaxed mb-8">
                ✓ Weeks of daily journal prompts &nbsp;·&nbsp; ✓ Scripture for every stage
                &nbsp;·&nbsp; ✓ Designed for the whole unemployment journey
              </p>
              <a
                href="https://www.amazon.com/dp/B0GRQBC2JP"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink-900 hover:bg-ink-800 text-gold-400 font-bold px-8 py-4 rounded-xl transition-colors text-sm tracking-widest uppercase"
              >
                Buy on Amazon →
              </a>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-ink-900/20 blur-2xl" />
                <img
                  src="/waiting_room_last_frame_v2.jpg"
                  alt="The Waiting Room — available on Amazon"
                  className="relative w-52 rounded-xl shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section aria-label="Frequently asked questions" className="bg-cream-100 py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink-900 text-center mb-4">
            Common questions
          </h2>
          <p className="text-stone-500 text-center mb-12">
            For people navigating job loss and wondering where God is in it.
          </p>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-cream-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-medium text-ink-900 hover:text-gold-600 transition-colors"
                >
                  <span>{item.q}</span>
                  <span className="text-gold-500 text-xl flex-shrink-0">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <p className="px-6 pb-5 text-stone-600 text-sm leading-relaxed">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOLLOW / COMMUNITY ── */}
      <section aria-label="Follow Luke 4:18 on social media" className="bg-white py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <img
            src="/luke418_logo_v4.svg"
            alt="Luke 4:18 Free Indeed"
            className="h-16 w-16 object-contain mx-auto mb-6"
          />
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-900 mb-3">
            Join the community
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Daily encouragement, scripture, and stories from people walking through
            the waiting room. You're not alone in this season.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-cream-200 hover:border-gold-500 text-ink-800 hover:text-gold-600 transition-colors rounded-xl px-5 py-3 text-sm font-medium"
              >
                {s.icon}
                <span>{s.label}</span>
                <span className="text-stone-400 text-xs">{s.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-ink-900 py-12 px-6 text-center">
        <img
          src="/luke418_logo_v4.svg"
          alt="Luke 4:18 Free Indeed"
          className="h-16 w-16 object-contain mx-auto mb-4 opacity-90"
        />
        <p className="text-stone-500 text-sm italic mb-6">"He has sent me to proclaim freedom…"</p>
        <div className="flex items-center justify-center gap-6 mb-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-stone-500 hover:text-gold-500 transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>
        <a
          href="https://www.amazon.com/dp/B0GRQBC2JP"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold-500 hover:text-gold-400 text-sm transition-colors"
        >
          Get The Waiting Room on Amazon
        </a>
        <p className="text-stone-700 text-xs mt-6">© 2025 Luke 4:18. All rights reserved.</p>
      </footer>
    </div>
  )
}
