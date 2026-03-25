import { useState } from 'react'
import LandingPage from './components/LandingPage'
import ThankYouPage from './components/ThankYouPage'

export default function App() {
  const [submitted, setSubmitted] = useState(false)
  return submitted
    ? <ThankYouPage />
    : <LandingPage onSuccess={() => setSubmitted(true)} />
}
