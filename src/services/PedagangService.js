import api from './api'

export const getProduk = async () => {
  const res = await api.get('/pedagang/produk')
  return res.data
}

export const addProduk = async (payload) => {
  const res = await api.post('/pedagang/produk', payload)
  return res.data
}

export const updateProduk = async (idProduk, payload) => {
  const res = await api.put(`/pedagang/produk/${idProduk}`, payload)
  return res.data
}

export const deleteProduk = async (idProduk) => {
  const res = await api.delete(`/pedagang/produk/${idProduk}`)
  return res.data
}

export const updateStok = async (idProduk, payload) => {
  const res = await api.patch(`/pedagang/produk/${idProduk}/stok`, payload)
  return res.data
}

export const getOrders = async () => {
  const res = await api.get('/pedagang/orders')
  return res.data
}

export const completeOrder = async (idOrder) => {
  const res = await api.post(`/pedagang/orders/${idOrder}/complete`)
  return res.data
}
