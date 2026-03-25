export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 flex items-center justify-center px-6">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🕊️</span>
        </div>
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
          You're in
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-5">
          Your journal is ready.
        </h1>
        <p className="text-stone-300 text-lg leading-relaxed mb-8">
          Click below to download your free 3-day excerpt of{' '}
          <em className="text-amber-200">The Waiting Room</em>. We also sent a copy to your inbox
          so you can access it anytime.
        </p>
        <a
          href="/waiting-room-3-day-sample.pdf"
          download
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-4 rounded-xl transition-all text-sm tracking-widest uppercase mb-4"
        >
          ↓ Download Free Journal
        </a>
        <p className="text-stone-500 text-xs mb-12">
          PDF · Opens on any device
        </p>

        <div className="border-t border-white/10 pt-10">
          <p className="text-stone-400 text-sm mb-1">
            Ready to go deeper?
          </p>
          <p className="text-stone-300 text-sm mb-5">
            The full journal is available now on Amazon.
          </p>
          <a
            href="https://www.amazon.com/dp/B0GRQBC2JP"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-amber-500/40 text-amber-400 hover:text-amber-300 hover:border-amber-400 font-medium text-sm px-6 py-3 rounded-xl transition-colors"
          >
            Get The Waiting Room on Amazon →
          </a>
        </div>
      </div>
    </div>
  )
}
