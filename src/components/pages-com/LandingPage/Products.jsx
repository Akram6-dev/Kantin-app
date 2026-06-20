import '../../../style/LandingPage/Products.css'

function Products() {
  const foodItems = [
    {
      id: 1,
      kantin: 'Kantin 1',
      nama: 'Ayam Geprek',
      image: '/img/ayam_geprek.jpg'
    },
    {
      id: 2,
      kantin: 'Kantin 2',
      nama: 'Mie Ayam',
      image: '/img/mie_ayam.jpg'
    },
    {
      id: 3,
      kantin: 'Kantin 3',
      nama: 'Nasi Goreng',
      image: '/img/nasi_goreng.jpg'
    },
    {
      id: 4,
      kantin: 'Kantin 4',
      nama: 'Seblak',
      image: '/img/seblak.jpg'
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
                <img src={item.image} alt={item.nama} className="product-image" />
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
