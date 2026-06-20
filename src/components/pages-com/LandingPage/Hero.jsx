import '../../../style/LandingPage/Hero.css'

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {/* Left side contents */}
        <div className="hero-content">
          <h1 className="hero-title">WEB KANTIN SEKOLAH</h1>
          <p className="hero-subtitle">PRE ORDER SEKARANG AMBIL NANTI</p>
          <p className="hero-description">
            Pesan makanan favoritmu dari kantin sekolah secara online sebelum jam istirahat. 
            Tanpa antre, lebih higienis, dan langsung ambil saat bel berbunyi!
          </p>
          <a href="/login" className="hero-cta">
            <span>Pesan Sekarang</span>
            <svg 
              className="rocket-icon" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              {/* Rocket body/fuselage */}
              <path 
                d="M12 2C14 6 16.5 9 16.5 13.5C16.5 16 15 17.5 12 17.5C9 17.5 7.5 16 7.5 13.5C7.5 9 10 6 12 2Z" 
                fill="currentColor" 
              />
              {/* Left Wing */}
              <path 
                d="M7.5 13C5.5 14 4.5 16.5 4.5 18.5C6.5 18.5 7.5 17.5 8.5 15.5Z" 
                fill="currentColor" 
              />
              {/* Right Wing */}
              <path 
                d="M16.5 13C18.5 14 19.5 16.5 19.5 18.5C17.5 18.5 16.5 17.5 15.5 15.5Z" 
                fill="currentColor" 
              />
              {/* Window */}
              <circle cx="12" cy="10" r="1.5" fill="#9A4600" />
              {/* Flame */}
              <path 
                d="M10 17.5C10 20.5 12 22.5 12 22.5C12 22.5 14 20.5 14 17.5Z" 
                fill="#FF9F00" 
              />
            </svg>
          </a>
        </div>

        {/* Right side SVG illustration */}
        <div className="hero-illustration">
          <div className="illustration-wrapper">
            <svg viewBox="0 0 500 500" className="burger-svg">
              <defs>
                <linearGradient id="bunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFB366" />
                  <stop offset="100%" stopColor="#D46A00" />
                </linearGradient>
                <linearGradient id="pattyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7A3B12" />
                  <stop offset="100%" stopColor="#4A1E05" />
                </linearGradient>
                <linearGradient id="cheeseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFDF00" />
                  <stop offset="100%" stopColor="#FF9F00" />
                </linearGradient>
              </defs>

              {/* Decorative background circle */}
              <circle cx="250" cy="250" r="190" fill="#FFF1EB" />
              <circle cx="250" cy="250" r="150" fill="#FFE5D9" />

              <g>
                {/* Top Bun */}
                <path d="M120,200 C120,110 380,110 380,200 C380,210 120,210 120,200 Z" fill="url(#bunGrad)" />
                
                {/* Sesame seeds */}
                <ellipse cx="200" cy="150" rx="3" ry="6" fill="#FFE3CC" transform="rotate(-30, 200, 150)" />
                <ellipse cx="250" cy="140" rx="3" ry="6" fill="#FFE3CC" />
                <ellipse cx="300" cy="160" rx="3" ry="6" fill="#FFE3CC" transform="rotate(25, 300, 160)" />
                <ellipse cx="170" cy="180" rx="3" ry="6" fill="#FFE3CC" transform="rotate(-15, 170, 180)" />
                <ellipse cx="230" cy="175" rx="3" ry="6" fill="#FFE3CC" transform="rotate(10, 230, 175)" />
                <ellipse cx="330" cy="185" rx="3" ry="6" fill="#FFE3CC" transform="rotate(35, 330, 185)" />

                {/* Tomato slices */}
                <path d="M130,225 C130,215 240,215 240,225 C240,235 130,235 130,225 Z" fill="#E63946" />
                <path d="M260,225 C260,215 370,215 370,225 C370,235 260,235 260,225 Z" fill="#E63946" />

                {/* Lettuce waves */}
                <path d="M110,245 C130,235 140,255 160,245 C180,235 190,255 210,245 C230,235 240,255 260,245 C280,235 290,255 310,245 C330,235 340,255 360,245 C380,235 390,255 400,245 C410,235 405,260 380,260 C370,260 120,260 110,245 Z" fill="#52B788" />

                {/* Cheese slice melting */}
                <path d="M125,260 L375,260 L350,290 L290,270 L250,310 L210,270 L150,285 Z" fill="url(#cheeseGrad)" />

                {/* Patty */}
                <rect x="120" y="280" width="260" height="40" rx="15" fill="url(#pattyGrad)" />

                {/* Bottom Bun */}
                <path d="M125,325 C125,325 120,365 170,365 L330,365 C380,365 375,325 375,325 Z" fill="url(#bunGrad)" />
              </g>

              {/* Sparkle animations / accents */}
              <circle cx="90" cy="120" r="6" fill="#FFB366" opacity="0.6" />
              <circle cx="410" cy="300" r="10" fill="#FFB366" opacity="0.4" />
              <path d="M400,100 L415,115 M415,100 L400,115" stroke="#9A4600" strokeWidth="3" strokeLinecap="round" />
              <path d="M80,320 L90,330 M90,320 L80,330" stroke="#9A4600" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
