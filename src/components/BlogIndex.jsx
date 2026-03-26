import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-cream-50 font-sans">

      {/* NAV */}
      <nav className="bg-ink-900 px-6 py-4 md:px-12 flex items-center justify-between">
        <Link to="/">
          <img src="/luke418_logo_v4.svg" alt="Luke 4:18 Free Indeed" className="h-12 w-12 object-contain" />
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/blog" className="text-sm text-gold-400 font-medium">Blog</Link>
          <Link to="/gift" className="text-sm text-stone-400 hover:text-gold-400 transition-colors">Gift Ideas</Link>
          <Link
            to="/"
            className="text-sm font-medium text-ink-900 bg-gold-500 hover:bg-gold-400 transition-colors rounded-full px-4 py-1.5"
          >
            Free Journal
          </Link>
        </div>
      </nav>

      {/* HEADER */}
      <section className="bg-ink-900 py-16 px-6 text-center">
        <p className="text-gold-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">Resources</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
          Faith for the Waiting Room
        </h1>
        <p className="text-stone-400 max-w-xl mx-auto">
          Honest articles for people navigating unemployment, job loss, and the in-between season.
        </p>
      </section>

      {/* POSTS */}
      <section className="max-w-3xl mx-auto py-16 px-6">
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block bg-white rounded-2xl border border-cream-200 p-7 hover:border-gold-400 hover:shadow-md transition-all group"
            >
              <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2">{post.readTime}</p>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-ink-900 mb-3 group-hover:text-gold-700 transition-colors">
                {post.title}
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <span className="text-gold-600 text-sm font-medium">Read more →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-ink-900 py-16 px-6 text-center">
        <p className="text-gold-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">Free Resource</p>
        <h2 className="font-serif text-3xl font-bold text-white mb-4">
          Start your 3 free days today.
        </h2>
        <p className="text-stone-400 mb-8 max-w-md mx-auto">
          A guided journal for people working through unemployment. Scripture, prompts, and space to hear from God.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-ink-900 font-bold px-8 py-4 rounded-xl transition-all text-sm tracking-widest uppercase"
        >
          Get Free Access
        </Link>
      </section>
    </div>
  )
}
