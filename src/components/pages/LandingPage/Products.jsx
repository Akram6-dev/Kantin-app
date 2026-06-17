import '../../../style/LandingPage/Products.css'

function Products() {
  const foodItems = [
    {
      id: 1,
      kantin: 'Kantin 1',
      nama: 'Burger Double Cheese',
      illustration: (
        <svg viewBox="0 0 200 200" className="product-svg">
          <defs>
            <linearGradient id="pBun" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFAE59" />
              <stop offset="100%" stopColor="#D46300" />
            </linearGradient>
            <linearGradient id="pPatty" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#803D14" />
              <stop offset="100%" stopColor="#4D1F05" />
            </linearGradient>
          </defs>
          {/* Background shape */}
          <circle cx="100" cy="100" r="75" fill="#FFEFEA" />
          {/* Burger */}
          <g transform="translate(10, 5)">
            <path d="M50,90 C50,55 130,55 130,90 Z" fill="url(#pBun)" />
            <ellipse cx="75" cy="75" rx="1.5" ry="3" fill="#FFF" />
            <ellipse cx="90" cy="70" rx="1.5" ry="3" fill="#FFF" transform="rotate(15, 90, 70)" />
            <ellipse cx="105" cy="75" rx="1.5" ry="3" fill="#FFF" transform="rotate(-15, 105, 75)" />
            
            {/* Cheese */}
            <path d="M52,90 L128,90 L120,102 L100,95 L90,105 L80,95 L65,102 Z" fill="#FFC93C" />
            {/* Patty */}
            <rect x="48" y="100" width="84" height="15" rx="6" fill="url(#pPatty)" />
            {/* Lettuce */}
            <path d="M46,112 C60,108 70,118 80,112 C90,108 100,118 110,112 C120,108 130,118 134,112 L130,116 L50,116 Z" fill="#40916C" />
            {/* Bottom Bun */}
            <path d="M52,118 C52,118 50,135 70,135 L110,135 C130,135 128,118 128,118 Z" fill="url(#pBun)" />
          </g>
          {/* Small Drink or Fries Accent */}
          <g transform="translate(115, 95)">
            <rect x="0" y="5" width="25" height="35" rx="3" fill="#E63946" />
            <rect x="3" y="0" width="4" height="10" fill="#FFC93C" rx="1" />
            <rect x="9" y="-3" width="4" height="13" fill="#FFC93C" rx="1" />
            <rect x="15" y="-1" width="4" height="11" fill="#FFC93C" rx="1" />
            <rect x="21" y="2" width="4" height="8" fill="#FFC93C" rx="1" />
            <path d="M0,20 L25,20 L25,40 L0,40 Z" fill="#9A4600" opacity="0.1" />
            <circle cx="12.5" cy="22" r="5" fill="#FFF" opacity="0.9" />
          </g>
        </svg>
      )
    },
    {
      id: 2,
      kantin: 'Kantin 2',
      nama: 'Pizza Slice Margherita',
      illustration: (
        <svg viewBox="0 0 200 200" className="product-svg">
          <defs>
            <linearGradient id="pCrust" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFA64D" />
              <stop offset="100%" stopColor="#C45A00" />
            </linearGradient>
            <linearGradient id="pCheese" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF275" />
              <stop offset="100%" stopColor="#FFB300" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="75" fill="#FFEFEA" />
          <g transform="translate(15, 10)">
            {/* Crust */}
            <path d="M85,30 C110,25 140,40 150,65 L85,150 Z" fill="url(#pCrust)" />
            {/* Cheese Base */}
            <path d="M88,37 C108,33 133,46 142,67 L88,136 Z" fill="url(#pCheese)" />
            {/* Pepperonis */}
            <circle cx="105" cy="60" r="10" fill="#E63946" />
            <circle cx="102" cy="58" r="7" fill="#C32F3A" opacity="0.8" />
            
            <circle cx="125" cy="80" r="8" fill="#E63946" />
            <circle cx="123" cy="79" r="5" fill="#C32F3A" opacity="0.8" />

            <circle cx="100" cy="100" r="9" fill="#E63946" />
            <circle cx="98" cy="99" r="6" fill="#C32F3A" opacity="0.8" />
            
            {/* Basil leaves */}
            <path d="M120,48 C115,50 115,58 120,58 C125,58 123,50 120,48 Z" fill="#52B788" />
            <path d="M90,75 C85,77 87,83 90,83 C94,83 93,77 90,75 Z" fill="#52B788" />
          </g>
        </svg>
      )
    },
    {
      id: 3,
      kantin: 'Kantin 3',
      nama: 'Rice Bowl Nasi Goreng',
      illustration: (
        <svg viewBox="0 0 200 200" className="product-svg">
          <defs>
            <linearGradient id="pBowl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D44D4D" />
              <stop offset="100%" stopColor="#9E2A2B" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="75" fill="#FFEFEA" />
          <g transform="translate(10, 10)">
            {/* Bowl Shadow */}
            <ellipse cx="90" cy="138" rx="55" ry="10" fill="#7A3B12" opacity="0.15" />
            
            {/* Rice Heap */}
            <ellipse cx="90" cy="98" rx="52" ry="24" fill="#F4F1DE" />
            <circle cx="65" cy="90" r="14" fill="#F4F1DE" />
            <circle cx="80" cy="84" r="16" fill="#F4F1DE" />
            <circle cx="100" cy="84" r="16" fill="#F4F1DE" />
            <circle cx="115" cy="90" r="14" fill="#F4F1DE" />
            
            {/* Rice texture sprinkles */}
            <path d="M60,90 L65,92 M75,82 L80,84 M95,80 L98,84 M110,88 L114,92 M85,92 L90,94 M100,94 L103,96" stroke="#C4C1B0" strokeWidth="2" strokeLinecap="round" />
            
            {/* Egg (Sunny side up) */}
            <path d="M70,82 C55,85 55,105 70,105 C85,105 85,82 70,82 Z" fill="#FFFFFF" />
            <circle cx="70" cy="93" r="10" fill="#FFB300" />
            <circle cx="68" cy="91" r="3" fill="#FFF" opacity="0.8" />
            
            {/* Cucumber slices */}
            <g transform="rotate(-15, 115, 85)">
              <circle cx="115" cy="85" r="10" fill="#74C69D" />
              <circle cx="115" cy="85" r="7" fill="#95D5B2" />
            </g>
            <g transform="rotate(10, 125, 95)">
              <circle cx="125" cy="95" r="10" fill="#74C69D" />
              <circle cx="125" cy="95" r="7" fill="#95D5B2" />
            </g>

            {/* Bowl Base */}
            <path d="M35,100 C35,145 145,145 145,100 Z" fill="url(#pBowl)" />
            {/* Bowl Rim */}
            <ellipse cx="90" cy="100" rx="55" ry="7" fill="#E07A5F" />
          </g>
        </svg>
      )
    },
    {
      id: 4,
      kantin: 'Kantin 4',
      nama: 'Ramen Special Kuah Pedas',
      illustration: (
        <svg viewBox="0 0 200 200" className="product-svg">
          <defs>
            <linearGradient id="pRBowl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2F3E46" />
              <stop offset="100%" stopColor="#1E282C" />
            </linearGradient>
            <linearGradient id="pSoup" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E63946" />
              <stop offset="100%" stopColor="#9B2226" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="75" fill="#FFEFEA" />
          <g transform="translate(10, 10)">
            {/* Bowl Shadow */}
            <ellipse cx="90" cy="138" rx="55" ry="10" fill="#7A3B12" opacity="0.15" />
            
            {/* Ramen Soup */}
            <ellipse cx="90" cy="98" rx="52" ry="22" fill="url(#pSoup)" />
            
            {/* Noodles wavy pattern */}
            <path d="M50,96 C60,88 65,105 75,96 C85,88 90,105 100,96 C110,88 115,105 125,96" fill="none" stroke="#FFD166" strokeWidth="4" strokeLinecap="round" />
            <path d="M55,104 C62,98 68,110 76,104 C84,98 90,110 98,104 C106,98 112,110 120,104" fill="none" stroke="#FFD166" strokeWidth="4" strokeLinecap="round" />
            
            {/* Boiled Egg Half */}
            <g transform="translate(105, 82)">
              <ellipse cx="14" cy="14" rx="14" ry="10" fill="#FFF" transform="rotate(15, 14, 14)" />
              <ellipse cx="12" cy="14" rx="8" ry="6" fill="#FFA200" transform="rotate(15, 14, 14)" />
            </g>
            
            {/* Nori sheet */}
            <rect x="42" y="70" width="22" height="30" rx="2" fill="#242F22" transform="rotate(-20, 42, 70)" />
            
            {/* Chopsticks lifting noodles */}
            <path d="M40,65 L140,55" stroke="#9A4600" strokeWidth="4" strokeLinecap="round" />
            <path d="M38,72 L140,59" stroke="#9A4600" strokeWidth="4" strokeLinecap="round" />

            {/* Bowl Base */}
            <path d="M35,100 C35,145 145,145 145,100 Z" fill="url(#pRBowl)" />
            {/* Bowl Rim */}
            <ellipse cx="90" cy="100" rx="55" ry="7" fill="#D62828" />

            {/* Steam waves */}
            <path d="M75,65 C78,55 72,50 75,40" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <path d="M95,62 C98,52 92,47 95,37" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <path d="M115,67 C118,57 112,52 115,42" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </g>
        </svg>
      )
    }
  ]

  return (
    <section id="products" className="products-section">
      <div className="products-container">
        <h2 className="products-title">Jelajahi makanan kantin!</h2>
        
        <div className="products-grid">
          {foodItems.map((item) => (
            <div key={item.id} className="product-card">
              <div className="product-image-container">
                {item.illustration}
              </div>
              <div className="product-info">
                <span className="product-kantin">{item.kantin}</span>
                <h3 className="product-name">{item.nama}</h3>
                <a href="/login" className="product-btn">Beli Sekarang</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
