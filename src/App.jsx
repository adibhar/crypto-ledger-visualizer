import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Info from './pages/Info'
import { Visualizer } from './pages/Visualizer';
import './index.css'

function App() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/info">Info</Link>
        <Link to="/visualizer">Visualizer</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/visualizer" element={<Visualizer />} />
      </Routes>
    </div>
  )
}

export default App
