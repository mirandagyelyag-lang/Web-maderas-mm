import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import AdminConversations from '@/pages/AdminConversations'
import PageNotFound from '@/lib/PageNotFound'
import ScrollToTop from '@/components/ScrollToTop'

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminConversations />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}
