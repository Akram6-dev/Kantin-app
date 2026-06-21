import '../../styles/navbar.css'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'

function NavbarPembeli({ user, searchValue, onSearchChange }) {
  const navigate = useNavigate()
  const userName = user?.nama || user?.name || 'Pembeli'
  const profilePhoto = user?.foto_profil_url || user?.avatar_url

  return (
    <header className="dashboard-navbar">
      <div className="dashboard-navbar-brand" onClick={() => navigate('/Pembeli')} role="button" tabIndex={0}>
        KANTIN SEKOLAH
      </div>

      <div className="dashboard-navbar-search">
        <SearchBar value={searchValue} onChange={onSearchChange} />
      </div>

      <div className="dashboard-navbar-actions">
        <span className="dashboard-user-name">{userName}</span>
        <button
          className="dashboard-profile-button"
          type="button"
          onClick={() => navigate('/profil')}
          aria-label="Buka profil"
        >
          {profilePhoto ? (
            <img src={profilePhoto} alt={userName} />
          ) : (
            <span>{userName.slice(0, 1).toUpperCase()}</span>
          )}
        </button>
        <button className="dashboard-notification-button" type="button" aria-label="Notifikasi">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18 8A6 6 0 0 0 6 8c0 7-3 8-3 8h18s-3-1-3-8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21a2 2 0 0 1-3.46 0"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default NavbarPembeli
