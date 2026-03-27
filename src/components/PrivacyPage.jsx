import { Link } from 'react-router-dom'

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F5F0E8', fontFamily: 'Inter, sans-serif' }}>

      {/* NAV */}
      <nav style={{ background: '#0a0a0a', padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '18px', fontStyle: 'italic', color: '#C9A84C', textDecoration: 'none' }}>
          Luke 4:18
        </Link>
        <Link to="/" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(245,240,232,0.55)', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '64px 24px 80px' }}>
        <p style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#C9A84C', marginBottom: '16px' }}>
          Legal
        </p>
        <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '40px', fontWeight: '700', color: '#0a0a0a', marginBottom: '8px' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '13px', color: 'rgba(10,10,10,0.4)', marginBottom: '48px' }}>
          Last updated: March 2026
        </p>

        <div style={{ fontSize: '15px', lineHeight: '1.8', color: 'rgba(10,10,10,0.75)' }}>

          <p style={{ marginBottom: '24px' }}>
            This Privacy Policy explains how Luke 4:18 Publishers ("we", "us", or "our") collects,
            uses, and protects your personal information when you visit{' '}
            <strong style={{ color: '#0a0a0a' }}>luke418free.com</strong>.
          </p>

          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '22px', color: '#0a0a0a', marginBottom: '12px', marginTop: '40px' }}>
            What we collect
          </h2>
          <p style={{ marginBottom: '16px' }}>
            We collect your email address when you sign up to receive the free 3-day excerpt of
            The Waiting Room journal. We may also collect your first name if you provide it.
          </p>
          <p style={{ marginBottom: '24px' }}>
            We do not collect payment information, browsing history, or any other personal data
            beyond what you voluntarily provide through our sign-up form.
          </p>

          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '22px', color: '#0a0a0a', marginBottom: '12px', marginTop: '40px' }}>
            How we use your information
          </h2>
          <p style={{ marginBottom: '12px' }}>We use your email address to:</p>
          <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Deliver the free journal content you requested</li>
            <li style={{ marginBottom: '8px' }}>Send occasional follow-up emails related to The Waiting Room journal</li>
            <li style={{ marginBottom: '8px' }}>Share updates, encouragement, and resources from Luke 4:18 Publishers</li>
          </ul>
          <p style={{ marginBottom: '24px' }}>
            We will never sell, rent, or share your personal data with third parties for their
            marketing purposes. Ever.
          </p>

          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '22px', color: '#0a0a0a', marginBottom: '12px', marginTop: '40px' }}>
            Email service provider
          </h2>
          <p style={{ marginBottom: '24px' }}>
            We use Klaviyo to manage and send emails. Your email address is stored securely on
            Klaviyo's platform. You can read Klaviyo's privacy policy at{' '}
            <a href="https://www.klaviyo.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer" style={{ color: '#C9A84C' }}>
              klaviyo.com/legal/privacy-notice
            </a>.
          </p>

          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '22px', color: '#0a0a0a', marginBottom: '12px', marginTop: '40px' }}>
            Cookies and tracking
          </h2>
          <p style={{ marginBottom: '24px' }}>
            This website uses Google Analytics and the Meta Pixel to understand how visitors
            find and use our site. These tools may use cookies to collect anonymised usage data.
            No personally identifiable information is shared with these platforms through cookies.
          </p>

          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '22px', color: '#0a0a0a', marginBottom: '12px', marginTop: '40px' }}>
            Unsubscribing
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Every email we send includes an unsubscribe link at the bottom. You can opt out at
            any time. Once unsubscribed, we will not send you further emails.
          </p>

          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '22px', color: '#0a0a0a', marginBottom: '12px', marginTop: '40px' }}>
            Your rights
          </h2>
          <p style={{ marginBottom: '24px' }}>
            You have the right to request access to, correction of, or deletion of your personal
            data at any time. To make a request, email us directly and we will respond promptly.
          </p>

          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '22px', color: '#0a0a0a', marginBottom: '12px', marginTop: '40px' }}>
            Contact
          </h2>
          <p style={{ marginBottom: '8px' }}>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <p style={{ marginBottom: '48px' }}>
            <strong style={{ color: '#0a0a0a' }}>Luke 4:18 Publishers</strong><br />
            Website: luke418free.com
          </p>

          <div style={{ borderTop: '1px solid rgba(10,10,10,0.1)', paddingTop: '32px', fontSize: '13px', color: 'rgba(10,10,10,0.4)' }}>
            © 2026 Luke 4:18 Publishers. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}
