import { useState } from 'react'
import { Link } from 'react-router-dom'

const KLAVIYO_PUBLIC_KEY = import.meta.env.VITE_KLAVIYO_PUBLIC_KEY || 'Xmx8KD'
const KLAVIYO_LIST_ID = import.meta.env.VITE_KLAVIYO_LIST_ID || 'Wzb547'

function EmailForm({ dark = false }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(
        `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_PUBLIC_KEY}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'revision': '2023-02-22',
          },
          body: JSON.stringify({
            data: {
              type: 'subscription',
              attributes: {
                list_id: KLAVIYO_LIST_ID,
                email,
                custom_source: 'Luke418Free Landing Page',
              },
            },
          }),
        }
      )
      if (res.ok || res.status === 202) {
        window.gtag?.('event', 'generate_lead', {
          event_category: 'Free Journal',
          event_label: 'WaitingRoom Form',
        })
        window.fbq?.('track', 'Lead')
        setSubmitted(true)
      } else {
        const body = await res.json().catch(() => ({}))
        console.error('Klaviyo error', res.status, body)
        throw new Error()
      }
    } catch (err) {
      console.error('Form submit error:', err)
      setError('Something went wrong. Try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <p style={{ color: '#C9A84C', fontSize: '16px', fontFamily: 'Inter, sans-serif', marginTop: '8px' }}>
        Check your inbox. Day 1 is on its way.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <input
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: '100%',
          padding: '14px 16px',
          fontSize: '15px',
          fontFamily: 'Inter, sans-serif',
          background: dark ? '#1a1a1a' : '#ffffff',
          color: dark ? '#F5F0E8' : '#0a0a0a',
          border: dark ? '1.5px solid rgba(201,168,76,0.3)' : '1.5px solid #ddd',
          borderRadius: '8px',
          outline: 'none',
          boxSizing: 'border-box',
          marginBottom: '12px',
        }}
      />
      {error && (
        <p style={{ color: '#C9A84C', fontSize: '13px', fontFamily: 'Inter, sans-serif', marginBottom: '10px' }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '15px',
          background: loading ? 'rgba(201,168,76,0.6)' : '#C9A84C',
          color: '#0a0a0a',
          fontSize: '14px',
          fontWeight: '700',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '12px',
          transition: 'background 0.2s',
        }}
      >
        {loading ? 'Sending...' : 'Start Day 1 Today. It\'s Free.'}
      </button>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '12px',
        color: 'rgba(245,240,232,0.45)',
        margin: 0,
        textAlign: 'center',
      }}>
        Joined by people navigating job loss, career transitions, and unexpected life changes.
      </p>
    </form>
  )
}

export default function WaitingRoomLanding() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', scrollBehavior: 'smooth' }}>

      {/* ── NAV ── */}
      <nav style={{
        background: '#0a0a0a',
        padding: '18px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: 'Playfair Display, Georgia, serif',
          fontSize: '18px',
          fontStyle: 'italic',
          color: '#C9A84C',
          letterSpacing: '0.02em',
        }}>
          Luke 4:18
        </span>
        <a
          href="https://www.amazon.com/dp/B0GRQBC2JP"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(245,240,232,0.55)',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(201,168,76,0.35)',
            paddingBottom: '2px',
          }}
        >
          Get Full Journal
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="wrl-hero" style={{
        background: '#0a0a0a',
        minHeight: 'calc(100vh - 61px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
      }}>
        <div className="wrl-hero-grid" style={{
          maxWidth: '1000px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '60px',
          alignItems: 'center',
        }}>

          {/* Book cover — hidden on mobile */}
          <div className="wrl-hero-image" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                inset: '-20px',
                borderRadius: '20px',
                background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }} />
              <img
                src="/waiting_room_last_frame_v2.jpg"
                alt="The Waiting Room — free 3-day journal for job loss"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '280px',
                  borderRadius: '12px',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>

          {/* Text + form */}
          <div>
            <p className="wrl-hero-label" style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#C9A84C',
              marginBottom: '20px',
            }}>
              Free 3-Day Journal
            </p>
            <h1 className="wrl-hero-h1" style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(36px, 5vw, 54px)',
              fontWeight: '700',
              color: '#FFFFFF',
              lineHeight: '1.1',
              marginBottom: '24px',
              letterSpacing: '-0.01em',
            }}>
              You've been your job title for so long<br />you forgot{' '}
              <span style={{ color: '#C9A84C' }}>who you are without it.</span>
            </h1>
            <p className="wrl-hero-body" style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              color: 'rgba(245,240,232,0.65)',
              lineHeight: '1.75',
              marginBottom: '36px',
            }}>
              If you just lost your job, or you've been in the waiting longer than you expected,
              this journal was made for you. 3 free days. Just you, a pen,
              and whatever God wants to say.
            </p>
            <EmailForm dark />
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section style={{ background: '#111111', padding: '72px 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(26px, 4vw, 36px)',
            fontWeight: '700',
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: '52px',
          }}>
            Where this journal meets you.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0',
            position: 'relative',
          }}
            className="wrl-before-after-grid"
          >
            {/* Vertical divider — desktop only */}
            <div className="wrl-divider" style={{
              position: 'absolute',
              left: '50%',
              top: '0',
              bottom: '0',
              width: '1px',
              background: 'rgba(201,168,76,0.2)',
            }} />

            {/* BEFORE */}
            <div style={{ paddingRight: '40px' }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'rgba(245,240,232,0.4)',
                marginBottom: '24px',
              }}>
                Before
              </p>
              {[
                'Checking your phone for emails that haven\'t come',
                'Telling people you\'re exploring opportunities',
                'Lying awake wondering if God forgot about you',
              ].map((line, i) => (
                <p key={i} style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  color: 'rgba(245,240,232,0.45)',
                  lineHeight: '1.7',
                  marginBottom: '16px',
                }}>
                  {line}
                </p>
              ))}
            </div>

            {/* AFTER */}
            <div style={{ paddingLeft: '40px' }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#C9A84C',
                marginBottom: '24px',
              }}>
                After 30 Days
              </p>
              {[
                'Clarity on who you are outside of what you do',
                'A record of what God was saying the whole time',
                'The ability to say this season changed you, not broke you',
              ].map((line, i) => (
                <p key={i} style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  color: '#FFFFFF',
                  lineHeight: '1.7',
                  marginBottom: '16px',
                }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section style={{
        background: '#F5F0E8',
        padding: '80px 24px',
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: '700',
            color: '#0a0a0a',
            marginBottom: '16px',
          }}>
            What's inside the free 3 days
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            color: 'rgba(10,10,10,0.55)',
            lineHeight: '1.7',
            marginBottom: '56px',
            maxWidth: '500px',
            margin: '0 auto 56px',
          }}>
            Writing things out when life is hard actually works. Science backs it up and scripture
            grounds it. Ten minutes a day is all it asks.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            textAlign: 'left',
          }}>
            {[
              {
                emoji: '📖',
                title: 'Daily Scripture',
                desc: "Verses that speak to what you're actually going through. Not generic. Picked for the specific feelings that come with losing a job.",
              },
              {
                emoji: '✍️',
                title: 'Guided Prompts',
                desc: "Questions that get honest with God. Not fluffy. The kind that help you actually say what's happening and hear what He says back.",
              },
              {
                emoji: '🕊️',
                title: 'Space to Hear',
                desc: 'Pages to write what you are thinking, feeling, and hearing. No format. Just room to be real.',
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  padding: '28px',
                  boxShadow: '0 2px 16px rgba(10,10,10,0.07)',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '14px' }}>{card.emoji}</div>
                <h3 style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#0a0a0a',
                  marginBottom: '10px',
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: 'rgba(10,10,10,0.6)',
                  lineHeight: '1.7',
                  margin: 0,
                }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMAZON UPSELL ── */}
      <section style={{
        background: '#0a0a0a',
        padding: '72px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#C9A84C',
            marginBottom: '16px',
          }}>
            Ready to Go Deeper?
          </p>
          <h2 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(26px, 4vw, 36px)',
            fontWeight: '700',
            color: '#FFFFFF',
            lineHeight: '1.2',
            marginBottom: '16px',
          }}>
            Get the full 30-day journal.
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            color: 'rgba(245,240,232,0.55)',
            lineHeight: '1.7',
            marginBottom: '32px',
          }}>
            The free 3 days are the beginning. The full journal walks you through everything that comes next.
          </p>
          <a
            href="https://amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              background: 'transparent',
              border: '1.5px solid #C9A84C',
              borderRadius: '8px',
              color: '#C9A84C',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            Buy on Amazon
          </a>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section style={{
        background: '#111111',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#C9A84C',
            marginBottom: '20px',
          }}>
            Ready to Start?
          </p>
          <h2 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: '700',
            color: '#FFFFFF',
            lineHeight: '1.15',
            marginBottom: '20px',
          }}>
            The waiting room is hard.<br />You don't have to sit in it alone.
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            color: 'rgba(245,240,232,0.55)',
            lineHeight: '1.7',
            marginBottom: '36px',
          }}>
            3 days. Free. No card required. Just show up with a pen.
          </p>
          <EmailForm dark />
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            color: 'rgba(245,240,232,0.3)',
            marginTop: '20px',
          }}>
            Already have the free days?{' '}
            <a
              href="https://www.amazon.com/dp/B0GRQBC2JP"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#C9A84C',
                textDecoration: 'underline',
              }}
            >
              Get the full 30-day journal on Amazon.
            </a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0a0a0a', padding: '24px', textAlign: 'center' }}>
        <Link to="/privacy" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(245,240,232,0.3)', textDecoration: 'none' }}>
          Privacy Policy
        </Link>
        <span style={{ color: 'rgba(245,240,232,0.15)', margin: '0 12px' }}>·</span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(245,240,232,0.3)' }}>
          © 2026 Luke 4:18 Publishers
        </span>
      </footer>

    </div>
  )
}
