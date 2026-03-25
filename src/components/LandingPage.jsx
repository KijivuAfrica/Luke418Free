import { useState } from 'react'

const KLAVIYO_PUBLIC_KEY = import.meta.env.VITE_KLAVIYO_PUBLIC_KEY || 'Xmx8KD'
const KLAVIYO_LIST_ID = import.meta.env.VITE_KLAVIYO_LIST_ID || ''

export default function LandingPage({ onSuccess }) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
                    attributes: {
                      email,
                      first_name: firstName,
                    },
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
    <div className="min-h-screen font-sans">

      {/* NAV */}
      <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <span className="font-serif text-xl font-bold text-amber-100 tracking-wide">Luke 4:18</span>
        <a
          href="https://www.amazon.com/dp/B0GRQBC2JP"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-amber-200 hover:text-white transition-colors border border-amber-400/40 rounded-full px-4 py-1.5"
        >
          Get Full Book →
        </a>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 overflow-hidden px-6 py-28">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-300 blur-3xl" />
        </div>

        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-5">
            Free 3-Day Journal
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            You didn't lose<br />
            <em className="text-amber-300">your purpose.</em><br />
            Just your paycheck.
          </h1>
          <p className="text-stone-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Unemployment can feel like a wilderness. But God is still speaking.
            Get 3 free days from{' '}
            <em className="text-amber-200 font-medium">The Waiting Room</em> — a guided journal
            to help you process the season and listen for what's next.
          </p>

          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-xl bg-white/90 text-stone-900 placeholder-stone-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-xl bg-white/90 text-stone-900 placeholder-stone-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            {error && (
              <p className="text-red-300 text-sm mb-3 text-left">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all text-sm tracking-widest uppercase"
            >
              {loading ? 'Sending...' : 'Get Free Access'}
            </button>
            <p className="text-stone-400 text-xs mt-3">
              No spam. Just 3 days of hope. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="bg-amber-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 text-center mb-4">
            What's inside the free 3 days
          </h2>
          <p className="text-stone-500 text-center mb-12 max-w-lg mx-auto">
            Each day walks you through scripture, honest reflection, and space to hear from God.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📖',
                title: 'Daily Scripture',
                desc: "Grounding verses that speak directly into the experience of waiting, loss, and trusting God's timing.",
              },
              {
                icon: '✍️',
                title: 'Guided Prompts',
                desc: "Honest questions that help you process what you're feeling — and what God might be saying into it.",
              },
              {
                icon: '🕊️',
                title: 'Space to Listen',
                desc: 'Open journal pages designed to slow you down, write freely, and receive from God.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCRIPTURE BANNER */}
      <section className="bg-amber-900 py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-3xl italic text-amber-100 leading-relaxed mb-6">
            "The Spirit of the Lord is on me, because he has anointed me to proclaim
            good news to the poor... to set the oppressed free."
          </p>
          <p className="text-amber-400 font-semibold tracking-widest text-sm">— LUKE 4:18</p>
        </div>
      </section>

      {/* ABOUT THE BOOK */}
      <section className="bg-stone-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="w-52 h-72 rounded-xl bg-gradient-to-br from-amber-800 to-amber-950 shadow-2xl flex items-center justify-center text-center p-6">
                <div>
                  <p className="font-serif text-amber-100 text-lg font-bold leading-snug mb-3">The Waiting Room</p>
                  <div className="w-8 h-px bg-amber-500 mx-auto mb-3" />
                  <p className="text-amber-400 text-xs leading-relaxed">A journal for people working through unemployment and they want to hear from God</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-3">The Full Journal</p>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-4">
                The Waiting Room
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                The Waiting Room is more than a journal — it's a companion through one of life's most
                disorienting seasons. Through scripture, prayer, and structured reflection, it helps
                you find meaning in the wait and hear what God is saying.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8">
                The full journal contains weeks of daily prompts designed to transform
                the waiting room into an encounter with God.
              </p>
              <a
                href="https://www.amazon.com/dp/B0GRQBC2JP"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Get the Full Book on Amazon →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 py-10 px-6 text-center">
        <p className="font-serif text-amber-400 font-semibold text-lg mb-1">Luke 4:18</p>
        <p className="text-stone-500 text-sm mb-4 italic">"He has sent me to proclaim freedom..."</p>
        <a
          href="https://www.amazon.com/dp/B0GRQBC2JP"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-500 hover:text-amber-400 text-sm transition-colors"
        >
          Get The Waiting Room on Amazon
        </a>
        <p className="text-stone-600 text-xs mt-6">© 2025 Luke 4:18. All rights reserved.</p>
      </footer>
    </div>
  )
}
