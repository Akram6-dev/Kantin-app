import '../../styles/productModal.css'

function QuantityButton({ value, onDecrease, onIncrease, min = 1, max, className = '' }) {
  const classes = ['quantity-control', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <button type="button" onClick={onDecrease} disabled={value <= min}>
        -
      </button>
      <span>{value}</span>
      <button type="button" onClick={onIncrease} disabled={max !== undefined && value >= max}>
        +
      </button>
    </div>
  )
}

export default QuantityButton
