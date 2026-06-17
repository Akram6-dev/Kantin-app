import { useState } from 'react'
import '../../../style/LandingPage/Navbar.css'

function Navbar() {
  const [active, setActive] = useState('home')
  const [isOpen, setIsOpen] = useState(false)

  const handleNav = (section) => {
    setActive(section)
    const el = document.getElementById(section)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">KANTIN SEKOLAH</div>

      {/* Desktop Navigation Links */}
      <ul className="navbar-menu">
        <li>
          <button
            className={`navbar-link ${active === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className={`navbar-link ${active === 'products' ? 'active' : ''}`}
            onClick={() => handleNav('products')}
          >
            Products
          </button>
        </li>
      </ul>

      {/* Desktop Auth Buttons */}
      <div className="navbar-auth">
        <a href="/login" className="navbar-login">Login</a>
        <a href="/register" className="navbar-register">Register</a>
      </div>

      {/* Mobile Hamburger Button */}
      <button 
        className={`navbar-hamburger ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Mobile Drawer (Only Login & Register, Home and Product removed) */}
      {isOpen && (
        <div className="navbar-mobile-menu">
          <a href="/login" className="mobile-menu-item login-btn" onClick={() => setIsOpen(false)}>Login</a>
          <a href="/register" className="mobile-menu-item register-btn" onClick={() => setIsOpen(false)}>Register</a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
