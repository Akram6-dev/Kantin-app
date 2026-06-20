import Navbar from '../components/pages-com/landingpage/Navbar'
import Hero from '../components/pages-com/landingpage/Hero'
import Products from '../components/pages-com/landingpage/Products'
import Footer from '../components/common/Footer'

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
