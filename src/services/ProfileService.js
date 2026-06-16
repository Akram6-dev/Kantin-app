import api from './api'

export const updateProfile = async (payload) => {
  const res = await api.put('/profile/update', payload)
  return res.data
}
