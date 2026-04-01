import { useEffect } from 'react'

const AMAZON_URL = 'https://www.amazon.com/dp/B0GRQBC2JP?ref=ext_waiting_room_site'

function passUtmToLinks() {
  const params = new URLSearchParams(window.location.search)
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
  const hasUtm = utmKeys.some((k) => params.has(k))
  if (!hasUtm) return
  document.querySelectorAll('a[href*="amazon.com"]').forEach((a) => {
    try {
      const url = new URL(a.href)
      utmKeys.forEach((k) => { if (params.has(k)) url.searchParams.set(k, params.get(k)) })
      a.href = url.toString()
    } catch (_) {}
  })
}

export default function SalesPage() {
  useEffect(() => {
    document.title = 'The Waiting Room Journal | Faith-Based Journal for Job Loss & Career Transitions'
    passUtmToLinks()

    // FAQ accordion
    const questions = document.querySelectorAll('.sp-faq-question')
    function handleClick(e) {
      const btn = e.currentTarget
      const isOpen = btn.getAttribute('aria-expanded') === 'true'
      questions.forEach((b) => {
        b.setAttribute('aria-expanded', 'false')
        b.nextElementSibling.style.display = 'none'
      })
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true')
        btn.nextElementSibling.style.display = 'block'
      }
    }
    questions.forEach((btn) => btn.addEventListener('click', handleClick))
    return () => questions.forEach((btn) => btn.removeEventListener('click', handleClick))
  }, [])

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#0a0a0a', color: '#F5F0E8', lineHeight: 1.6, WebkitFontSmoothing: 'antialiased' }}>

      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#0a0a0a', borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontStyle: 'italic', color: '#C9A84C', letterSpacing: '0.02em' }}>Luke 4:18</span>
          <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" style={btnSmall}>Buy Now on Amazon</a>
        </div>
      </header>

      <main>

        {/* HERO */}
        <section style={{ background: '#0a0a0a', padding: '72px 0 80px', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="sp-hero-grid">
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }} className="sp-hero-image">
              <div style={{ position: 'absolute', inset: -30, borderRadius: 24, background: 'radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 68%)', filter: 'blur(24px)', pointerEvents: 'none' }} />
              <img
                src="/waiting_room_last_frame_v2.jpg"
                alt="The Waiting Room — 30-day faith journal for job loss and career transitions"
                style={{ position: 'relative', width: '100%', maxWidth: 320, borderRadius: 14, boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.12)', objectFit: 'cover' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={eyebrow}>The Waiting Room</p>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 22 }} className="sp-hero-h1">
                You've been your job title for so long you forgot <span style={{ color: '#C9A84C' }}>who you are without it.</span>
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(245,240,232,0.55)', lineHeight: 1.75, marginBottom: 28, maxWidth: 460 }} className="sp-hero-body">
                A 30-day guided journal for people navigating job loss, career transitions, and seasons of unexpected waiting. Scripture-rooted. Honest. Built for where you actually are.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 11, color: 'rgba(245,240,232,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Paperback</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>$29.99</span>
                </span>
                <span style={{ color: 'rgba(201,168,76,0.25)', fontSize: 18 }}>·</span>
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 11, color: 'rgba(245,240,232,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Hardcover</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>$39.99</span>
                </span>
              </div>
              <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" style={btnLarge}>Get Your Copy on Amazon →</a>
              <p style={{ fontSize: 12, color: 'rgba(245,240,232,0.35)', marginTop: 12, fontStyle: 'italic' }}>30 days of guided reflection for your season of transition</p>
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER */}
        <section style={{ background: '#111111', padding: '80px 0' }}>
          <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
            <h2 style={{ ...sectionHeading, textAlign: 'center', marginBottom: 48 }}>Where this journal meets you.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '0 48px', alignItems: 'start', maxWidth: 760, margin: '0 auto' }} className="sp-ba-grid">
              <div>
                <p style={baLabel}>Before</p>
                <ul style={baList}>
                  <li style={baItem}>Checking your phone for emails that haven't come</li>
                  <li style={baItem}>Telling people you're "exploring opportunities"</li>
                  <li style={baItem}>Lying awake wondering if God forgot about you</li>
                </ul>
              </div>
              <div style={{ background: 'rgba(201,168,76,0.25)' }} className="sp-ba-divider" />
              <div>
                <p style={{ ...baLabel, color: '#C9A84C' }}>After 30 Days</p>
                <ul style={baList}>
                  <li style={{ ...baItem, color: '#fff', borderLeftColor: 'rgba(201,168,76,0.35)' }}>Clarity on who you are outside of what you do</li>
                  <li style={{ ...baItem, color: '#fff', borderLeftColor: 'rgba(201,168,76,0.35)' }}>A record of what God was saying the whole time</li>
                  <li style={{ ...baItem, color: '#fff', borderLeftColor: 'rgba(201,168,76,0.35)' }}>The ability to say this season changed you, not broke you</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT'S INSIDE */}
        <section style={{ background: '#F5F0E8', padding: '80px 0' }}>
          <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <p style={{ ...eyebrow, color: '#C9A84C' }}>What's Inside</p>
            <h2 style={{ ...sectionHeading, color: '#0a0a0a' }}>Every day gives you something to work with.</h2>
            <p style={{ fontSize: 15, color: 'rgba(10,10,10,0.55)', lineHeight: 1.75, maxWidth: 540, margin: '0 auto 52px' }}>
              Not generic journaling prompts. Content written specifically for the emotional and spiritual weight of job loss.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              {[
                { icon: '📖', title: '30 Days of Devotional Entries', desc: 'Each day opens with a scripture passage chosen specifically for the feelings that come with job loss — fear, shame, uncertainty, and hope.' },
                { icon: '✍️', title: 'Reflection Prompts for Clarity', desc: "Honest questions that help you process what's happening — not the cleaned-up version you tell people, but the real version you bring to God." },
                { icon: '🕊️', title: 'Faith-Based Guidance for Transitions', desc: 'Grounded in Luke 4:18, this journal is built on the belief that God has something to say to you right now. Not just after.' },
                { icon: '📝', title: 'Workbook-Style Writing Space', desc: 'Generous lined pages for every entry. Room to write, pray, and process. No format required — just space to be real.' },
              ].map((card) => (
                <div key={card.title} style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 2px 20px rgba(10,10,10,0.07)', textAlign: 'left' }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{card.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: '#0a0a0a', marginBottom: 10, lineHeight: 1.3 }}>{card.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(10,10,10,0.6)', lineHeight: 1.7 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ background: '#0a0a0a', padding: '80px 0' }}>
          <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
            <p style={{ ...eyebrow, textAlign: 'center' }}>What Readers Say</p>
            <h2 style={{ ...sectionHeading, textAlign: 'center' }}>From people who've been in the waiting room.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 64 }}>
              {[
                { text: '"I lost my job in January and didn\'t know what to do with all the time I suddenly had. This journal gave me somewhere to put it. By Day 10 I was writing things I didn\'t know I believed."', author: '— Marcus T., verified Amazon purchase' },
                { text: '"I\'ve been a Christian for 20 years but this was the first time I actually sat down and asked God what He was doing in a hard season instead of just praying for it to end."', author: '— Diane R., verified Amazon purchase' },
                { text: '"Got this as a gift from a friend when I was laid off. Started it as a courtesy. Finished it because I needed to. The last entry made me cry."', author: '— James K., verified Amazon purchase' },
              ].map((t) => (
                <div key={t.author} style={{ background: '#1a1a1a', borderRadius: 12, padding: 28, border: '1px solid rgba(201,168,76,0.1)' }}>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontStyle: 'italic', color: '#F5F0E8', lineHeight: 1.7, marginBottom: 16 }}>{t.text}</p>
                  <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#C9A84C' }}>{t.author}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
              <div style={{ width: 40, height: 2, background: '#C9A84C', margin: '0 auto 32px' }} />
              <p style={{ ...eyebrow, textAlign: 'center' }}>About This Journal</p>
              <p style={{ fontSize: 15, color: 'rgba(245,240,232,0.55)', lineHeight: 1.8, marginBottom: 16 }}>
                The Waiting Room was written from inside the experience — not from the other side of it looking back.
                It's built on Luke 4:18, where Jesus announces good news for the poor and freedom for the oppressed.
                If unemployment has you feeling both of those things, this journal is personal. God hasn't gone quiet.
                This is a way to slow down enough to actually hear Him.
              </p>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#C9A84C' }}>Published by Luke 4:18 Publishers</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: '#111111', padding: '80px 0' }}>
          <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px' }}>
            <p style={{ ...eyebrow, textAlign: 'center' }}>Common Questions</p>
            <h2 style={{ ...sectionHeading, textAlign: 'center' }}>Before you buy.</h2>
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              {[
                { q: 'Is this a Christian journal?', a: "Yes. It's rooted in Luke 4:18 theology on God's purpose for our lives. Every entry includes scripture and is written from a faith perspective. If that resonates with you, this journal was made for you." },
                { q: 'How long does it take to complete?', a: "30 days, one entry per day. Each entry takes around 10–15 minutes. You can work at your own pace — there's no deadline, and the waiting room doesn't rush you." },
                { q: 'Can I gift this to someone?', a: "Absolutely. It's available on Amazon in both paperback and hardcover. The hardcover makes a particularly thoughtful gift. If someone you love just lost their job, this is one of the most meaningful things you can send them." },
                { q: "What if I'm not religious?", a: "This journal is written from a Christian faith perspective — it includes scripture and prayer prompts throughout. If that's not where you are, it may not be the right fit. If you're open to it or spiritually curious, many readers have found it helpful regardless of where they started." },
                { q: 'Is there a free version I can try first?', a: null },
              ].map((item, i) => (
                <div key={i} style={{ borderBottom: '1px solid rgba(245,240,232,0.08)' }}>
                  <button
                    className="sp-faq-question"
                    aria-expanded="false"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '20px 0', background: 'none', border: 'none', color: '#F5F0E8', fontFamily: "'Inter', system-ui, sans-serif", fontSize: 15, fontWeight: 500, textAlign: 'left', cursor: 'pointer' }}
                  >
                    {item.q}
                    <span style={{ flexShrink: 0, fontSize: 22, fontWeight: 300, color: '#C9A84C', lineHeight: 1 }}>+</span>
                  </button>
                  <div style={{ display: 'none', paddingBottom: 20 }}>
                    <p style={{ fontSize: 14, color: 'rgba(245,240,232,0.55)', lineHeight: 1.8 }}>
                      {item.a || (
                        <>Yes. The first 3 days are available as a free PDF download at <a href="https://luke418free.com" style={{ color: '#C9A84C', textDecoration: 'underline' }}>luke418free.com</a>. No card required.</>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ background: '#0a0a0a', padding: '96px 0' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <p style={{ ...eyebrow, textAlign: 'center' }}>Don't let this season go to waste.</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
              The waiting room is hard.<br />
              <span style={{ color: '#C9A84C' }}>You don't have to sit in it alone.</span>
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(245,240,232,0.55)', lineHeight: 1.7, marginBottom: 36 }}>
              30 days. Scripture-grounded. Written for where you actually are.
            </p>
            <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" style={btnLarge}>Get The Waiting Room on Amazon →</a>
            <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.35)', marginTop: 16 }}>Paperback $29.99 &nbsp;·&nbsp; Hardcover $39.99</p>
            <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.35)', marginTop: 12 }}>
              Not ready to buy? <a href="https://luke418free.com" style={{ color: '#C9A84C', textDecoration: 'underline' }}>Get the first 3 days free.</a>
            </p>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ background: '#111111', borderTop: '1px solid rgba(201,168,76,0.1)', padding: '40px 0' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 14, fontStyle: 'italic', color: '#C9A84C' }}>Luke 4:18 Publishers</span>
          <nav style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 24px' }}>
            {[
              { label: 'Amazon', href: AMAZON_URL, external: true },
              { label: 'Privacy', href: '/privacy', external: false },
              { label: 'Free Journal', href: '/', external: false },
              { label: 'Instagram', href: 'https://www.instagram.com/luke418_free/', external: true },
              { label: 'TikTok', href: 'https://www.tiktok.com/@luke418free', external: true },
            ].map((l) => (
              <a key={l.label} href={l.href} target={l.external ? '_blank' : undefined} rel={l.external ? 'noopener noreferrer' : undefined}
                style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(245,240,232,0.35)', textDecoration: 'none' }}>
                {l.label}
              </a>
            ))}
          </nav>
          <p style={{ fontSize: 11, color: 'rgba(245,240,232,0.2)' }}>© 2026 Luke 4:18 Publishers. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @media (max-width: 767px) {
          .sp-hero-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .sp-hero-image { display: none !important; }
          .sp-hero-h1 { font-size: 26px !important; }
          .sp-ba-grid { grid-template-columns: 1fr !important; gap: 40px 0 !important; }
          .sp-ba-divider { display: none !important; }
        }
        .sp-faq-question:hover { color: #fff; }
        .sp-faq-question[aria-expanded="true"] { color: #C9A84C; }
        .sp-faq-question[aria-expanded="true"] span { transform: rotate(45deg); display: inline-block; }
      `}</style>
    </div>
  )
}

/* ── shared styles ── */
const eyebrow = {
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: 10,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  color: '#C9A84C',
  marginBottom: 14,
  display: 'block',
}

const sectionHeading = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: 'clamp(28px, 4vw, 40px)',
  fontWeight: 700,
  color: '#fff',
  lineHeight: 1.15,
  marginBottom: 16,
}

const btnBase = {
  display: 'inline-block',
  fontFamily: "'Inter', system-ui, sans-serif",
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  borderRadius: 8,
  textDecoration: 'none',
  background: '#C9A84C',
  color: '#0a0a0a',
  border: 'none',
  cursor: 'pointer',
}

const btnSmall = { ...btnBase, fontSize: 11, padding: '10px 20px' }
const btnLarge = { ...btnBase, fontSize: 14, padding: '16px 40px' }

const baLabel = {
  fontSize: 10,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  color: 'rgba(245,240,232,0.35)',
  marginBottom: 24,
}

const baList = { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 18, padding: 0, margin: 0 }

const baItem = {
  fontSize: 15,
  lineHeight: 1.65,
  color: 'rgba(245,240,232,0.55)',
  paddingLeft: 16,
  borderLeft: '2px solid rgba(245,240,232,0.1)',
}
