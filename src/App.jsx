
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Overall from './pages/overall'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overall" element={<Overall />} />
      </Routes>
    </Router>
  )
}

export default App
