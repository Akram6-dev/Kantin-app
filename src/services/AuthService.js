import api from './api'
import { USE_MOCK, mockRes, mockErr } from '../mock/mockResponse'
import { mockUsers, mockLoginAccounts } from '../mock/users'

export const login = async (identifier, password) => {
  if (USE_MOCK) {
    const account = mockLoginAccounts.find(
      (a) => a.identifier === identifier && a.password === password
    )
    if (!account) return mockErr('Email/Password salah', 401)
    const user = mockUsers.find((u) => u.id === account.userId)
    const token = `mock-token-${user.id}`
    localStorage.setItem('token', token)
    localStorage.setItem('mock_user_id', user.id)
    return mockRes({ ...user, token }, 'Login berhasil')
  }
  const res = await api.post('/auth/login', { identifier, password })
  const token = res.data?.data?.token
  if (token) localStorage.setItem('token', token)
  return res.data
}

export const registerSiswa = async (formData) => {
  if (USE_MOCK) {
    return mockRes(
      { id: 104, nisn: formData.get?.('nisn'), nama: formData.get?.('nama'), role: 'siswa', status_akun: 'active', token: 'mock-token-104' },
      'Registrasi berhasil, NISN tervalidasi dengan data master'
    )
  }
  const res = await api.post('/auth/register/siswa', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export const registerGuru = async (formData) => {
  if (USE_MOCK) {
    return mockRes(
      { id: 56, nama: formData.get?.('nama'), role: 'guru', status_verifikasi: 'pending', token: 'mock-token-56' },
      'Registrasi guru berhasil, menunggu verifikasi kartu pegawai oleh Admin'
    )
  }
  const res = await api.post('/auth/register/guru', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export const logout = async () => {
  if (USE_MOCK) {
    localStorage.removeItem('token')
    localStorage.removeItem('mock_user_id')
    return mockRes(null, 'Logout berhasil')
  }
  await api.post('/auth/logout')
  localStorage.removeItem('token')
}

export const getMe = async () => {
  if (USE_MOCK) {
    const id = parseInt(localStorage.getItem('mock_user_id'))
    const user = mockUsers.find((u) => u.id === id)
    if (!user) return mockErr('Unauthenticated', 401)
    return mockRes(user)
  }
  const res = await api.get('/auth/me')
  return res.data
}

export const updateMe = async (formData) => {
  if (USE_MOCK) {
    return mockRes({ id: parseInt(localStorage.getItem('mock_user_id')) }, 'Profil berhasil diperbarui')
  }
  const res = await api.put('/auth/me', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export const changePassword = async (payload) => {
  if (USE_MOCK) return mockRes(null, 'Password berhasil diubah')
  const res = await api.patch('/auth/change-password', payload)
  return res.data
}
