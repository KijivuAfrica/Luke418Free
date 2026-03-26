import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import ThankYouPage from './components/ThankYouPage'
import GiftPage from './components/GiftPage'
import BlogIndex from './components/BlogIndex'
import BlogPost from './components/BlogPost'

function Home() {
  const [submitted, setSubmitted] = useState(false)
  return submitted
    ? <ThankYouPage />
    : <LandingPage onSuccess={() => setSubmitted(true)} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gift" element={<GiftPage />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  )
}
