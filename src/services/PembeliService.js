import api from './api'

export const getDashboard = async () => {
  const res = await api.get('/customer/dashboard')
  return res.data
}

export const checkout = async (payload) => {
  const res = await api.post('/customer/orders/checkout', payload)
  return res.data
}

export const batalOrder = async (idOrderGroup) => {
  const res = await api.delete(`/customer/orders/${idOrderGroup}/batal`)
  return res.data
}

export const getTracking = async () => {
  const res = await api.get('/customer/orders/tracking')
  return res.data
}
