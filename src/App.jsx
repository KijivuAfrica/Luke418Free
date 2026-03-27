import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WaitingRoomLanding from './components/WaitingRoomLanding'
import PrivacyPage from './components/PrivacyPage'
import LandingPage from './components/LandingPage'
import ThankYouPage from './components/ThankYouPage'
import GiftPage from './components/GiftPage'
import BlogIndex from './components/BlogIndex'
import BlogPost from './components/BlogPost'

function OriginalHome() {
  const [submitted, setSubmitted] = useState(false)
  return submitted
    ? <ThankYouPage />
    : <LandingPage onSuccess={() => setSubmitted(true)} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WaitingRoomLanding />} />
        <Route path="/original" element={<OriginalHome />} />
        <Route path="/gift" element={<GiftPage />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </BrowserRouter>
  )
}
