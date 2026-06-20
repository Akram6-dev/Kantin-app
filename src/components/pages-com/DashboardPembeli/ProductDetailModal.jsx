function ProductDetailModal({
  product,
  kantins,
  quantity,
  onQuantityChange,
  onClose,
  onAddToCart,
  adding,
}) {
  if (!product) return null

  const image = product.foto_url || product.image_url || product.gambar_url
  const isAvailable = product.stok > 0 && product.status_stok !== 'Out of Stock'
  const standIndex = kantins.findIndex((kantin) => kantin.id === product.stand_id)
  const standLabel = standIndex >= 0 ? `Kantin ${standIndex + 1}` : product.nama_stand || 'Kantin'
  const totalPrice = Number(product.harga || 0) * quantity

  const formatPrice = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(Number(value || 0))
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`Detail ${product.nama}`}>
      <div className="product-detail-modal">
        <div className="product-detail-image">
          {image ? <img src={image} alt={product.nama} /> : <div>Tidak ada gambar</div>}
        </div>

        <div className="product-detail-content">
          <div>
            <h2>{product.nama}</h2>
            <p className="product-detail-description">
              {product.keterangan || product.deskripsi || 'Deskripsi makanan belum tersedia.'}
            </p>
          </div>

          <div className="product-info-pills">
            <div className="product-info-pill">
              <strong>{standLabel}</strong>
            </div>
            <div className="product-info-pill product-status-pill">
              <span className={`status-dot${isAvailable ? ' status-dot-green' : ' status-dot-red'}`} />
              <strong>{isAvailable ? 'Tersedia' : 'Tidak tersedia'}</strong>
            </div>
            <div className="product-info-pill">
              <strong>Stok: {product.stok ?? 0}</strong>
            </div>
          </div>

          <div className="product-total-card">
            <div>
              <span>Total Harga</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>
            <div className="quantity-control">
              <button type="button" onClick={() => onQuantityChange(Math.max(1, quantity - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => onQuantityChange(Math.min(product.stok || quantity + 1, quantity + 1))}
              >
                +
              </button>
            </div>
          </div>

          <div className="product-modal-actions">
            <button
              className="product-cart-submit"
              type="button"
              disabled={adding || !isAvailable}
              onClick={() => onAddToCart(product, quantity)}
            >
              {adding ? 'Menambahkan...' : 'Tambah ke Keranjang'}
            </button>
            <button className="product-modal-close" type="button" onClick={onClose}>
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal
