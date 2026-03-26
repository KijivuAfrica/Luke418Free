import { Link } from 'react-router-dom'

export default function GiftPage() {
  return (
    <div className="min-h-screen bg-cream-50 font-sans">

      {/* NAV */}
      <nav className="bg-ink-900 px-6 py-4 md:px-12 flex items-center justify-between">
        <Link to="/">
          <img src="/luke418_logo_v4.svg" alt="Luke 4:18 Free Indeed" className="h-12 w-12 object-contain" />
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/blog" className="text-sm text-stone-400 hover:text-gold-400 transition-colors">Blog</Link>
          <Link to="/gift" className="text-sm text-gold-400 font-medium">Gift Ideas</Link>
          <Link
            to="/"
            className="text-sm font-medium text-ink-900 bg-gold-500 hover:bg-gold-400 transition-colors rounded-full px-4 py-1.5"
          >
            Free Journal
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-ink-900 py-20 px-6 text-center">
        <p className="text-gold-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          Gift for someone who lost their job
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-5 max-w-3xl mx-auto">
          You can't fix it for them.<br />
          <span className="text-gold-400">But you can remind them they're not alone.</span>
        </h1>
        <p className="text-stone-400 text-lg max-w-xl mx-auto mb-10">
          When someone you love loses their job, most gift ideas feel hollow.
          This one meets them where they actually are.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.amazon.com/dp/B0GRQBC2JP"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-ink-900 font-bold px-8 py-4 rounded-xl transition-all text-sm tracking-widest uppercase"
          >
            Buy on Amazon
          </a>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 border border-gold-500/40 text-gold-400 hover:text-gold-300 hover:border-gold-400 font-medium px-8 py-4 rounded-xl transition-colors text-sm"
          >
            Send Them the Free Version First
          </Link>
        </div>
      </section>

      {/* BOOK SHOWCASE */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gold-500/10 blur-2xl" />
              <img
                src="/waiting_room_last_frame_v2.jpg"
                alt="The Waiting Room journal — a gift for someone who lost their job"
                className="relative w-60 rounded-xl shadow-2xl border border-cream-200 object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">The Gift</p>
            <h2 className="font-serif text-3xl font-bold text-ink-900 mb-4">
              The Waiting Room
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              A guided journal written specifically for people working through unemployment. Each day has a scripture, honest reflection prompts, and open space to write and pray.
            </p>
            <p className="text-stone-600 leading-relaxed mb-4">
              It doesn't rush them toward the next job. It gives them room to be exactly where they are — in the waiting room — without feeling like they need to fix it immediately.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8">
              That's what makes it different from generic self-help. It's scripture-based, honest about the grief of job loss, and built for people who want to hear from God in the middle of it.
            </p>
            <a
              href="https://www.amazon.com/dp/B0GRQBC2JP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink-900 hover:bg-ink-800 text-gold-400 font-semibold px-6 py-3 rounded-xl transition-colors border border-gold-600/30"
            >
              Get it on Amazon →
            </a>
          </div>
        </div>
      </section>

      {/* WHY THIS WORKS */}
      <section className="bg-cream-100 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-ink-900 mb-4">
            Why a journal beats most other gift ideas
          </h2>
          <p className="text-stone-500">
            Most gifts for someone going through job loss accidentally minimize what they're feeling. This one validates it.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '🎯',
              title: 'It meets them where they are',
              desc: "It doesn't say \"stay positive\" or \"something better is coming.\" It says: this is hard, God sees you, and here's a way to process it honestly.",
            },
            {
              icon: '📖',
              title: 'It gives them something to do',
              desc: "The hardest part of unemployment is having too much unstructured time and no sense of purpose. A daily journal gives structure without pressure.",
            },
            {
              icon: '🕊️',
              title: "It says what you can't",
              desc: "Sometimes you don't have the right words. This journal says them for you — scripture, honesty, and the reminder that God is still in this.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-cream-200">
              <div className="text-3xl mb-3" aria-hidden="true">{item.icon}</div>
              <h3 className="font-serif text-lg font-semibold text-ink-900 mb-2">{item.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT TO WRITE IN THE CARD */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-ink-900 text-center mb-4">
            What to write in the card
          </h2>
          <p className="text-stone-500 text-center mb-10">
            This is what everyone Googles and nobody covers. Here are a few honest options that actually land.
          </p>
          <div className="space-y-4">
            {[
              "\"What you do doesn't define who you are. I'm proud of you regardless.\"",
              "\"This is a hard season. I'm not going anywhere.\"",
              "\"You don't have to have it figured out yet. I'm here.\"",
              "\"I don't have the right words. But I wanted you to know I see you.\"",
              "\"God hasn't forgotten you. And neither have I.\"",
            ].map((quote, i) => (
              <div key={i} className="bg-cream-100 border-l-4 border-gold-500 rounded-r-xl px-5 py-4">
                <p className="text-ink-900 font-medium italic">{quote}</p>
              </div>
            ))}
          </div>
          <p className="text-stone-500 text-sm mt-8 text-center">
            You don't need to fix it in the card. Acknowledging it honestly is enough.
          </p>
        </div>
      </section>

      {/* TRY FREE FIRST */}
      <section className="bg-ink-900 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">Not sure yet?</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-5">
            Send them the first 3 days free.
          </h2>
          <p className="text-stone-400 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Share the free version with the person you're thinking of. They sign up with their email and get the first 3 days instantly. No cost, no card. Just a way to show them you thought of them.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-ink-900 font-bold px-8 py-4 rounded-xl transition-all text-sm tracking-widest uppercase"
          >
            Send Free Access
          </Link>
          <p className="text-stone-600 text-xs mt-4">Or get the full journal on Amazon for a complete gift.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink-900 border-t border-white/10 py-10 px-6 text-center">
        <Link to="/">
          <img src="/luke418_logo_v4.svg" alt="Luke 4:18 Free Indeed" className="h-12 w-12 object-contain mx-auto mb-4 opacity-80" />
        </Link>
        <p className="text-stone-600 text-xs">2025 Luke 4:18. All rights reserved.</p>
      </footer>
    </div>
  )
}
