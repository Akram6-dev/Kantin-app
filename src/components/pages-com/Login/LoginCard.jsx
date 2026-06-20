import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../../services/AuthService'
import '../../../style/Login/LoginCard.css'

function LoginCard() {
  const [showPassword, setShowPassword] = useState(false)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await login(identifier, password)
      const role = res.data?.role
      if (role === 'admin') navigate('/dashboard-admin')
      else if (role === 'pedagang') navigate('/dashboard-pedagang')
      else navigate('/dashboard-pembeli')
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">HALAMAN LOG-IN</h2>
        <p className="login-subtitle">Log-in untuk dapat pre-order makanan</p>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <label className="input-label">Email Address</label>
          <div className="input-group">
            <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#682D00" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <polyline points="2,4 12,13 22,4"/>
            </svg>
            <input type="email" placeholder="Masukkan email..." value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
          </div>

          {/* Password */}
          <label className="input-label">Password</label>
          <div className="input-group">
            <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#682D00" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <input type={showPassword ? 'text' : 'password'} placeholder="Masukkan password..." value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#682D00" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#682D00" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="remember-forgot">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
            <button type="button" className="forgot-password">Forgot Password?</button>
          </div>

          {error && <p className="error-msg">{error}</p>}

          {/* Buttons */}
          <div className="action-buttons">
            <button type="button" className="btn-back" onClick={() => navigate(-1)}>Kembali</button>
            <button type="submit" className="btn-login" disabled={loading}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#682D00" strokeWidth="2">
                <path d="M13 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Register */}
        <p className="register-text">
          Tidak punya akun?{' '}
          <a className="register-link" onClick={() => navigate('/register')}>registrasi di sini !</a>
        </p>
      </div>
    </div>
  )
}

export default LoginCard
