import { useState } from 'react'

const KLAVIYO_PUBLIC_KEY = import.meta.env.VITE_KLAVIYO_PUBLIC_KEY || 'Xmx8KD'
const KLAVIYO_LIST_ID = import.meta.env.VITE_KLAVIYO_LIST_ID || ''

const faqs = [
  {
    q: 'What should I do right after losing my job?',
    a: 'Give yourself permission to feel the loss. Job loss is a grief — and rushing past it rarely helps. The Waiting Room is designed to help you process the emotions, ground yourself in scripture, and listen for what God is saying before you rush into action.',
  },
  {
    q: 'How do I trust God when I\'m unemployed and scared?',
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

      {/* NAV */}
      <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 md:px-12">
        <img
          src="/logo.png"
          alt="Luke 4:18 Free Indeed"
          className="h-14 w-14 object-contain"
        />
        <a
          href="https://www.amazon.com/dp/B0GRQBC2JP"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-gold-300 hover:text-gold-400 transition-colors border border-gold-500/40 rounded-full px-4 py-1.5"
        >
          Get Full Book →
        </a>
      </nav>

      {/* HERO */}
      <section
        aria-label="Free 3-day journal offer"
        className="relative min-h-screen flex items-center justify-center bg-ink-900 overflow-hidden px-6 py-28"
      >
        {/* Gold glow accents matching logo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold-600/10 blur-3xl" />
        </div>

        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-gold-500 text-xs font-semibold uppercase tracking-[0.25em] mb-6">
            Free 3-Day Journal
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            You didn't lose<br />
            <em className="text-gold-400 not-italic">your purpose.</em><br />
            Just your paycheck.
          </h1>
          <p className="text-stone-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Unemployment can feel like a wilderness — but God is still speaking.
            Get 3 free days of{' '}
            <em className="text-gold-300 font-medium">The Waiting Room</em>,
            a scripture-based journal for people working through job loss who want to hear from God.
          </p>

          {/* Email Form */}
          <form
            onSubmit={handleSubmit}
            aria-label="Get free journal access"
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gold-500/20"
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
            {error && <p className="text-red-400 text-sm mb-3 text-left">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gold-500 hover:bg-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-ink-900 font-bold rounded-xl transition-all text-sm tracking-widest uppercase"
            >
              {loading ? 'Sending...' : 'Get Free Access'}
            </button>
            <p className="text-stone-500 text-xs mt-3">
              No spam. Just 3 days of hope. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section aria-label="What's inside the free journal" className="bg-cream-100 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink-900 text-center mb-4">
            What's inside your free 3 days
          </h2>
          <p className="text-stone-500 text-center mb-12 max-w-lg mx-auto">
            Each day walks you through scripture, honest reflection, and space to hear from God
            during your season of job loss.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📖',
                title: 'Daily Scripture',
                desc: 'Grounding verses that speak directly into the experience of unemployment, waiting, and trusting God\'s timing.',
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

      {/* SCRIPTURE BANNER */}
      <section aria-label="Luke 4:18 scripture" className="bg-ink-900 py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo ring accent */}
          <div className="w-16 h-px bg-gold-500 mx-auto mb-8 opacity-60" />
          <p className="font-serif text-2xl md:text-3xl italic text-cream-50 leading-relaxed mb-6">
            "The Spirit of the Lord is on me, because he has anointed me to proclaim
            good news to the poor… to set the oppressed free."
          </p>
          <p className="text-gold-500 font-semibold tracking-[0.2em] text-sm">— LUKE 4:18</p>
          <div className="w-16 h-px bg-gold-500 mx-auto mt-8 opacity-60" />
        </div>
      </section>

      {/* ABOUT THE BOOK */}
      <section aria-label="About The Waiting Room journal" className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Book visual */}
            <div className="flex justify-center">
              <div className="w-52 h-72 rounded-xl bg-ink-900 shadow-2xl flex items-center justify-center text-center p-6 border border-gold-600/30">
                <div>
                  <div className="w-10 h-px bg-gold-500 mx-auto mb-4" />
                  <p className="font-serif text-cream-50 text-lg font-bold leading-snug mb-2">The Waiting Room</p>
                  <div className="w-10 h-px bg-gold-500 mx-auto mb-4" />
                  <p className="text-gold-500 text-xs leading-relaxed uppercase tracking-widest">Free Indeed</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">The Full Journal</p>
              <h2 className="font-serif text-3xl font-bold text-ink-900 mb-4">
                The Waiting Room
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                The Waiting Room is more than a journal — it's a companion for one of life's most
                disorienting seasons. Through scripture, prayer, and structured reflection,
                it helps you find meaning in unemployment and hear what God is speaking over your life.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8">
                The full journal contains weeks of daily prompts designed to transform
                the waiting room of job loss into an encounter with God.
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

      {/* FAQ — targets high-volume search queries */}
      <section aria-label="Frequently asked questions about unemployment and faith" className="bg-cream-100 py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink-900 text-center mb-4">
            Common questions
          </h2>
          <p className="text-stone-500 text-center mb-12">
            For people navigating job loss and wondering where God is in it.
          </p>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-cream-200 overflow-hidden"
              >
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

      {/* FOOTER */}
      <footer className="bg-ink-900 py-10 px-6 text-center">
        <img
          src="/logo.png"
          alt="Luke 4:18 Free Indeed"
          className="h-16 w-16 object-contain mx-auto mb-4 opacity-90"
        />
        <p className="text-stone-500 text-sm italic mb-4">"He has sent me to proclaim freedom…"</p>
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
