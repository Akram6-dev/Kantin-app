import Navbar from '../components/pages/landingpage/Navbar'
import Hero from '../components/pages/landingpage/Hero'
import Products from '../components/pages/landingpage/Products'
import Footer from '../components/pages/landingpage/Footer'

function LandingPage() {
  return (
    <div style={{ fontFamily: '"Inter", "Outfit", sans-serif', backgroundColor: '#FFFDFB' }}>
      <Navbar />
      <Hero />
      <Products />
      <Footer />
    </div>
  )
}

export default LandingPage
