import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import CVAnalyzer from './pages/CVAnalyzer'
import Interview from './pages/Interview'
import LinkedInOptimizer from './pages/LinkedInOptimizer'
import SkillsGap from './pages/SkillsGap'
import CareerRoadmap from './pages/CareerRoadmap'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main style={{ minHeight: '100vh', paddingBottom: '80px' }}>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/cv"         element={<CVAnalyzer />} />
          <Route path="/interview"  element={<Interview />} />
          <Route path="/linkedin"   element={<LinkedInOptimizer />} />
          <Route path="/skills-gap" element={<SkillsGap />} />
          <Route path="/roadmap"    element={<CareerRoadmap />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App