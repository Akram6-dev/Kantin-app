function HeaderKantin({ kantin, kantinIndex, loading }) {
  if (loading) return null

  const name = kantinIndex >= 0 ? `Kantin ${kantinIndex + 1}` : kantin?.nama_stand || 'Kantin'
  const image = kantin?.logo_url || kantin?.foto_profil_url

  return (
    <div className="menu-kantin-header">
      <div className="menu-kantin-avatar">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <span>{kantinIndex >= 0 ? kantinIndex + 1 : '?'}</span>
        )}
      </div>
      <h1 className="menu-kantin-name">{name}</h1>
    </div>
  )
}

export default HeaderKantin
