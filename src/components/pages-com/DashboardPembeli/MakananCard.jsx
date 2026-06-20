function MakananCard({ makanan, onAddToCart, onOpenDetail, adding }) {
  const image = makanan?.foto_url || makanan?.image_url || makanan?.gambar_url
  const isUnavailable = makanan?.stok === 0 || makanan?.status_stok === 'Out of Stock'

  const formatPrice = (value) => {
    const amount = Number(value || 0)
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleAdd = (event) => {
    event.stopPropagation()
    onAddToCart(makanan, 1)
  }

  return (
    <article
      className={`makanan-card${isUnavailable ? ' makanan-card-disabled' : ''}`}
      onClick={() => onOpenDetail(makanan)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter') onOpenDetail(makanan)
      }}
    >
      <div className="makanan-image-wrap">
        {image ? (
          <img src={image} alt={makanan.nama} />
        ) : (
          <div className="makanan-image-empty">Tidak ada gambar</div>
        )}
      </div>
      <div className="makanan-info">
        <h3>{makanan.nama}</h3>
        <div className="makanan-meta">
          <span>{formatPrice(makanan.harga)}</span>
          <button
            className="makanan-add-button"
            type="button"
            disabled={adding || isUnavailable}
            onClick={handleAdd}
            aria-label={`Tambah ${makanan.nama} ke keranjang`}
          >
            {adding ? (
              <span className="makanan-add-loader" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

export default MakananCard
