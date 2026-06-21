import '../../styles/productModal.css'
import '../../styles/cartModal.css'
import QuantityButton from './QuantityButton'

function CartModal({
  items,
  products,
  onClose,
  onUpdateQuantity,
  onClearCart,
  loading,
}) {
  const formatPrice = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(Number(value || 0))
  }

  const getProductImage = (item) => {
    const product = products.find((entry) => entry.id === Number(item.product_id))
    return product?.foto_url || product?.image_url || product?.gambar_url
  }

  const totalItems = items.reduce((total, item) => total + Number(item.qty || 0), 0)
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.subtotal || Number(item.harga || 0) * Number(item.qty || 0))
  }, 0)

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Keranjang saya">
      <div className="cart-modal">
        <button className="cart-close-button" type="button" onClick={onClose} aria-label="Tutup keranjang">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>

        <h2>Keranjang saya</h2>

        <div className="cart-item-list">
          {loading && <p className="cart-empty-state">Memuat keranjang...</p>}
          {!loading && items.length === 0 && <p className="cart-empty-state">Keranjang masih kosong.</p>}
          {!loading && items.map((item) => {
            const image = getProductImage(item)
            const qty = Number(item.qty || 0)
            const itemTotal = Number(item.subtotal || Number(item.harga || 0) * qty)

            return (
              <article className="cart-item-card" key={item.cart_item_id}>
                <div className="cart-item-image">
                  {image ? <img src={image} alt={item.nama_produk} /> : <span />}
                </div>
                <div className="cart-item-main">
                  <h3>{item.nama_produk}</h3>
                  <span>{formatPrice(item.harga)}</span>
                </div>
                <QuantityButton
                  className="cart-quantity-control"
                  value={qty}
                  min={0}
                  onDecrease={() => onUpdateQuantity(item, qty - 1)}
                  onIncrease={() => onUpdateQuantity(item, qty + 1)}
                />
                <strong className="cart-item-total">{formatPrice(itemTotal)}</strong>
              </article>
            )
          })}
        </div>

        <div className="cart-footer">
          <div className="cart-summary">
            <div>
              <span>Total Jajanan</span>
              <strong>{totalItems}</strong>
            </div>
            <div>
              <span>Total Harga</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>
          </div>

          <div className="cart-actions">
            <button className="cart-clear-button" type="button" onClick={onClearCart} disabled={items.length === 0}>
              Kosongkan Keranjang
            </button>
            <button className="cart-checkout-button" type="button" disabled={items.length === 0}>
              Lanjut Pembayaran
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartModal
