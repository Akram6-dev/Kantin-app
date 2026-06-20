import api from './api'
import { USE_MOCK, mockRes, mockResList, mockErr } from '../mock/mockResponse'
import { mockProducts } from '../mock/products'
import { mockMerchantOrders } from '../mock/orders'
import { mockMerchantIncome } from '../mock/finance'

let _products = [...mockProducts]
let _orders = [...mockMerchantOrders]

// Products
export const getProduk = async (params) => {
  if (USE_MOCK) return mockResList(_products)
  const res = await api.get('/merchant/products', { params })
  return res.data
}

export const addProduk = async (formData) => {
  if (USE_MOCK) {
    const newProd = { 
      id: Date.now(), 
      nama: formData.get?.('nama'), 
      harga: formData.get?.('harga'), 
      stok: formData.get?.('stok'), 
      status_stok: 'Tersedia' 
    }
    _products.push(newProd)
    return mockRes(newProd, 'Produk berhasil ditambahkan')
  }
  const res = await api.post('/merchant/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export const updateProduk = async (id, payload) => {
  if (USE_MOCK) {
    const idx = _products.findIndex(p => p.id === parseInt(id))
    if (idx === -1) return mockErr('Data tidak ditemukan', 404)
    _products[idx] = { ..._products[idx], ...payload }
    return mockRes(_products[idx], 'Produk berhasil diperbarui')
  }
  const res = await api.put(`/merchant/products/${id}`, payload)
  return res.data
}

export const deleteProduk = async (id) => {
  if (USE_MOCK) {
    _products = _products.filter(p => p.id !== parseInt(id))
    return mockRes(null, 'Produk berhasil dihapus')
  }
  const res = await api.delete(`/merchant/products/${id}`)
  return res.data
}

export const bulkUpdateStok = async (items) => {
  if (USE_MOCK) {
    items.forEach(item => {
      const idx = _products.findIndex(p => p.id === parseInt(item.product_id))
      if (idx !== -1) {
        _products[idx].stok = item.stok
        _products[idx].status_stok = item.stok > 0 ? 'Tersedia' : 'Out of Stock'
      }
    })
    return mockRes(items, 'Stok produk berhasil diperbarui')
  }
  const res = await api.patch('/merchant/products/stock-bulk', { items })
  return res.data
}

// Orders
export const getOrders = async (params) => {
  if (USE_MOCK) {
    let items = [..._orders]
    if (params?.status) items = items.filter(o => o.status === params.status)
    return mockResList(items)
  }
  const res = await api.get('/merchant/orders', { params })
  return res.data
}

export const completeOrder = async (order_id) => {
  if (USE_MOCK) {
    const idx = _orders.findIndex(o => o.order_id === order_id)
    if (idx !== -1) _orders[idx].status = 'selesai'
    return mockRes({ order_id, status: 'selesai' }, 'Pesanan ditandai selesai')
  }
  const res = await api.patch(`/merchant/orders/${order_id}/complete`)
  return res.data
}

export const confirmRefund = async (order_id, catatan) => {
  if (USE_MOCK) {
    const idx = _orders.findIndex(o => o.order_id === order_id)
    if (idx !== -1) _orders[idx].status = 'refunded_cash'
    return mockRes({ order_id, status: 'refunded_cash' }, 'Status pengembalian dana berhasil dikonfirmasi')
  }
  const res = await api.patch(`/merchant/orders/${order_id}/refund-confirm`, { catatan })
  return res.data
}

// Income Reports
export const getIncome = async (params) => {
  if (USE_MOCK) return mockRes(mockMerchantIncome)
  const res = await api.get('/merchant/reports/income', { params })
  return res.data
}

export const exportIncome = async (params) => {
  if (USE_MOCK) return mockRes({ file_url: 'https://cdn.kantin.sch.id/reports/stand-mock.xlsx' }, 'File laporan berhasil dibuat')
  const res = await api.get('/merchant/reports/income/export', { params })
  return res.data
}
