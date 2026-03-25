export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center px-6">
      <div className="max-w-lg mx-auto text-center">
        <img
          src="/luke418_logo_v4.svg"
          alt="Luke 4:18 Free Indeed"
          className="h-20 w-20 object-contain mx-auto mb-8 opacity-90"
        />
        <div className="w-16 h-px bg-gold-500 mx-auto mb-8 opacity-60" />
        <p className="text-gold-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
          You're in
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-5">
          Your journal is ready.
        </h1>
        <p className="text-stone-300 text-lg leading-relaxed mb-8">
          Click below to download your free 3-day excerpt of{' '}
          <em className="text-gold-300">The Waiting Room</em>. We sent a copy to your inbox too
          so you can find it anytime.
        </p>
        <a
          href="/waiting-room-3-day-sample.pdf"
          download
          className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-ink-900 font-bold px-8 py-4 rounded-xl transition-all text-sm tracking-widest uppercase mb-3"
        >
          ↓ Download Free Journal
        </a>
        <p className="text-stone-600 text-xs mb-12">PDF · Opens on any device</p>

        <div className="border-t border-white/10 pt-10">
          <p className="text-stone-400 text-sm mb-1">Ready to go deeper?</p>
          <p className="text-stone-300 text-sm mb-5">The full journal is available now on Amazon.</p>
          <a
            href="https://www.amazon.com/dp/B0GRQBC2JP"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gold-500/40 text-gold-400 hover:text-gold-300 hover:border-gold-400 font-medium text-sm px-6 py-3 rounded-xl transition-colors"
          >
            Get The Waiting Room on Amazon →
          </a>
        </div>
      </div>
    </div>
  )
}
