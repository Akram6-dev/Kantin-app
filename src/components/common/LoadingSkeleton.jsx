import '../../styles/productCard.css'

function LoadingSkeleton({ count = 8, variant = 'card' }) {
  if (variant === 'header') {
    return (
      <div className="loading-skeleton-header" aria-hidden="true">
        <div className="loading-skeleton-avatar" />
        <div className="loading-skeleton-title" />
      </div>
    )
  }

  return (
    <div className="loading-skeleton-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div className="loading-skeleton-card" key={index}>
          <div className="loading-skeleton-image" />
          <div className="loading-skeleton-text" />
          <div className="loading-skeleton-text short" />
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
