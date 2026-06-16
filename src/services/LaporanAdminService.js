import api from './api'

export const sendMessage = async (pesan) => {
  const res = await api.post('/chat/cs/send', { pesan })
  return res.data
}

export const getHistory = async () => {
  const res = await api.get('/chat/cs/history')
  return res.data
}
