import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

function renderBlock(block, i) {
  switch (block.type) {
    case 'intro':
      return (
        <p key={i} className="text-stone-700 text-lg leading-relaxed mb-6 font-medium">
          {block.text}
        </p>
      )
    case 'paragraph':
      return (
        <p key={i} className="text-stone-600 leading-relaxed mb-5">
          {block.text}
        </p>
      )
    case 'h2':
      return (
        <h2 key={i} className="font-serif text-2xl font-bold text-ink-900 mt-10 mb-4">
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 key={i} className="font-serif text-xl font-semibold text-ink-900 mt-8 mb-3">
          {block.text}
        </h3>
      )
    case 'list':
      return (
        <ul key={i} className="list-disc list-inside space-y-2 mb-6 text-stone-600">
          {block.items.map((item, j) => (
            <li key={j} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      )
    case 'verse':
      return (
        <div key={i} className="bg-cream-100 border-l-4 border-gold-500 rounded-r-xl px-6 py-5 my-7">
          <p className="text-gold-700 text-xs font-semibold uppercase tracking-widest mb-2">{block.reference}</p>
          <blockquote className="font-serif text-lg italic text-ink-900 leading-relaxed mb-3">
            {block.text}
          </blockquote>
          {block.reflection && (
            <p className="text-stone-500 text-sm leading-relaxed">{block.reflection}</p>
          )}
        </div>
      )
    case 'cta':
      return (
        <div key={i} className="bg-ink-900 rounded-2xl px-6 py-6 my-8 text-center">
          <p className="text-stone-300 mb-4">{block.text}</p>
          <a
            href={block.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-ink-900 font-bold px-6 py-3 rounded-xl transition-all text-sm tracking-widest uppercase"
          >
            {block.linkText}
          </a>
        </div>
      )
    case 'final-cta':
      return (
        <div key={i} className="border border-gold-500/30 rounded-2xl p-8 mt-12 text-center bg-cream-100">
          <img src="/luke418_logo_v4.svg" alt="Luke 4:18" className="h-14 w-14 object-contain mx-auto mb-4" />
          <h3 className="font-serif text-2xl font-bold text-ink-900 mb-3">
            Get your free 3-day journal
          </h3>
          <p className="text-stone-600 mb-6 max-w-sm mx-auto">
            Scripture, guided prompts, and space to hear from God during unemployment. Free, no card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-ink-900 font-bold px-6 py-3 rounded-xl transition-all text-sm tracking-widest uppercase"
            >
              Get Free Access
            </Link>
            <a
              href="https://www.amazon.com/dp/B0GRQBC2JP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-ink-900/30 text-ink-900 hover:border-gold-600 hover:text-gold-700 font-medium px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Full Journal on Amazon
            </a>
          </div>
        </div>
      )
    default:
      return null
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  useEffect(() => {
    if (post) {
      document.title = post.metaTitle
      const desc = document.querySelector('meta[name="description"]')
      if (desc) desc.setAttribute('content', post.metaDescription)
    }
  }, [post])

  if (!post) return <Navigate to="/blog" replace />

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

      {/* ARTICLE HEADER */}
      <div className="bg-ink-900 py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <Link to="/blog" className="text-gold-500 text-sm hover:text-gold-400 transition-colors mb-6 inline-block">
            ← Back to all articles
          </Link>
          <p className="text-gold-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">{post.readTime}</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* ARTICLE BODY */}
      <article className="max-w-2xl mx-auto py-12 px-6">
        {post.content.map((block, i) => renderBlock(block, i))}
      </article>

      {/* MORE POSTS */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <div className="border-t border-cream-200 pt-10">
          <h3 className="font-serif text-xl font-bold text-ink-900 mb-6">More articles</h3>
          <div className="space-y-4">
            {blogPosts
              .filter((p) => p.slug !== slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="block bg-white rounded-xl border border-cream-200 px-5 py-4 hover:border-gold-400 transition-all group"
                >
                  <p className="font-medium text-ink-900 group-hover:text-gold-700 transition-colors mb-1">{p.title}</p>
                  <p className="text-stone-400 text-xs">{p.readTime}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
