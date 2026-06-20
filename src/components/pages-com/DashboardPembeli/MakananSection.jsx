import MakananCard from './MakananCard'

function MakananSection({
  makanan,
  loading,
  error,
  page,
  totalPages,
  onNextPage,
  onAddToCart,
  onOpenProduct,
  addingProductId,
  cartMessage,
}) {
  return (
    <section className="dashboard-section makanan-section">
      <div className="dashboard-section-heading">
        <h2>Makanan Kantin</h2>
        {cartMessage && <p className="makanan-cart-message">{cartMessage}</p>}
      </div>

      <div className="makanan-content" aria-busy={loading}>
        {loading && <p className="dashboard-state">Memuat makanan kantin...</p>}
        {!loading && error && <p className="dashboard-state dashboard-state-error">{error}</p>}
        {!loading && !error && makanan.length === 0 && (
          <p className="dashboard-state">Makanan belum tersedia untuk pencarian ini.</p>
        )}
        {!loading && !error && makanan.length > 0 && (
          <>
            <div className="makanan-grid">
              {makanan.map((item) => (
                <MakananCard
                  key={item.id}
                  makanan={item}
                  onAddToCart={onAddToCart}
                  onOpenDetail={onOpenProduct}
                  adding={addingProductId === item.id}
                />
              ))}
            </div>
            <div className="makanan-pagination">
              <span>Halaman {page} dari {totalPages}</span>
              <button type="button" onClick={onNextPage} disabled={page >= totalPages}>
                Berikutnya
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default MakananSection
