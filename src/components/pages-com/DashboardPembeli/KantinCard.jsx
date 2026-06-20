import { useNavigate } from 'react-router-dom'

function KantinCard({ kantin, index }) {
  const navigate = useNavigate()
  const name = `Kantin ${index + 1}`
  const image = kantin?.logo_url || kantin?.foto_profil_url

  return (
    <button
      className="kantin-card"
      type="button"
      onClick={() => navigate(`/menu-kantin/${kantin.id}`)}
      aria-label={`Buka ${name}`}
    >
      <div className="kantin-avatar">
        {image ? <img src={image} alt={name} /> : <span>{index + 1}</span>}
      </div>
      <h3>{name}</h3>
    </button>
  )
}

export default KantinCard
