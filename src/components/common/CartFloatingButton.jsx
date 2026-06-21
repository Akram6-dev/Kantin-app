import '../../styles/cartModal.css'

function CartFloatingButton({ onClick }) {
  return (
    <button className="floating-cart-button" type="button" onClick={onClick} aria-label="Buka keranjang">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 6h15l-2 8H8L6 3H3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="20" r="1.7" fill="currentColor" />
        <circle cx="18" cy="20" r="1.7" fill="currentColor" />
      </svg>
    </button>
  )
}

export default CartFloatingButton
