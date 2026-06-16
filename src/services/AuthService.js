import api from './api'

export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password })
  const token = res.data?.data?.token || res.data?.token
  if (token) {
    localStorage.setItem('token', token)
  }
  return res.data
}

export const registerSiswa = async (payload) => {
  const res = await api.post('/auth/register/siswa', payload)
  return res.data
}

export const registerGuru = async (payload) => {
  const res = await api.post('/auth/register/guru', payload)
  return res.data
}

export const logout = () => {
  localStorage.removeItem('token')
}
