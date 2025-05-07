import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Info from './pages/Info'
import Mining from './pages/Mining'
import { Visualizer } from './pages/Visualizer';
import './index.css'

function App() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">Visualizer</Link>
        <Link to="/home">Wallets</Link>
        <Link to="/transact">Transact</Link>
        <Link to="/mining">Mining</Link>
      </nav>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/transact" element={<Info />} />
        <Route path="/mining" element={<Mining />} />
        <Route path="/" element={<Visualizer />} />
      </Routes>
    </div>
  )
}

export default App
