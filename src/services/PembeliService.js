import api from './api'
import { USE_MOCK, mockRes, mockResList, mockErr } from '../mock/mockResponse'
import { mockProducts, mockStands } from '../mock/products'
import { mockCart } from '../mock/cart'
import { mockOrders } from '../mock/orders'

let _cart = { ...mockCart }
let _orders = [...mockOrders]

// Products (read-only untuk pembeli)
export const getProducts = async (params) => {
  if (USE_MOCK) {
    let items = [...mockProducts]
    if (params?.stand_id) items = items.filter(p => p.stand_id === parseInt(params.stand_id))
    if (params?.search) items = items.filter(p => p.nama.toLowerCase().includes(params.search.toLowerCase()))
    return mockResList(items)
  }
  const res = await api.get('/products', { params })
  return res.data
}

export const getProductById = async (id) => {
  if (USE_MOCK) {
    const prod = mockProducts.find(p => p.id === parseInt(id))
    if (!prod) return mockErr('Produk tidak ditemukan', 404)
    return mockRes(prod)
  }
  const res = await api.get(`/products/${id}`)
  return res.data
}

export const getStands = async () => {
  if (USE_MOCK) return mockRes(mockStands)
  const res = await api.get('/products/stands')
  return res.data
}

// Cart
export const getCart = async () => {
  if (USE_MOCK) return mockRes(_cart)
  const res = await api.get('/cart')
  return res.data
}

export const addToCart = async (product_id, qty) => {
  if (USE_MOCK) {
    const prod = mockProducts.find(p => p.id === parseInt(product_id))
    if (!prod) return mockErr('Produk tidak ada', 404)
    if (prod.stok < qty) return mockErr('Stok tidak mencukupi', 422)
    const subtotal = prod.harga * qty
    const newItem = { 
      cart_item_id: Date.now(), 
      stand_id: prod.stand_id, 
      nama_stand: prod.nama_stand, 
      product_id, 
      nama_produk: prod.nama, 
      harga: prod.harga, 
      qty, 
      subtotal 
    }
    _cart.items.push(newItem)
    _cart.total_keseluruhan += subtotal
    return mockRes(newItem, 'Produk ditambahkan ke keranjang')
  }
  const res = await api.post('/cart/items', { product_id, qty })
  return res.data
}

export const updateCartItem = async (cart_item_id, qty) => {
  if (USE_MOCK) {
    const item = _cart.items.find(i => i.cart_item_id === parseInt(cart_item_id))
    if (!item) return mockErr('Item tidak ada', 404)
    _cart.total_keseluruhan -= item.subtotal
    item.qty = qty
    item.subtotal = item.harga * qty
    _cart.total_keseluruhan += item.subtotal
    return mockRes(item, 'Jumlah item diperbarui')
  }
  const res = await api.patch(`/cart/items/${cart_item_id}`, { qty })
  return res.data
}

export const removeCartItem = async (cart_item_id) => {
  if (USE_MOCK) {
    const item = _cart.items.find(i => i.cart_item_id === parseInt(cart_item_id))
    if (item) _cart.total_keseluruhan -= item.subtotal
    _cart.items = _cart.items.filter(i => i.cart_item_id !== parseInt(cart_item_id))
    return mockRes(null, 'Item dihapus dari keranjang')
  }
  const res = await api.delete(`/cart/items/${cart_item_id}`)
  return res.data
}

export const clearCart = async () => {
  if (USE_MOCK) {
    _cart.items = []
    _cart.total_keseluruhan = 0
    return mockRes(null, 'Keranjang berhasil dikosongkan')
  }
  const res = await api.delete('/cart')
  return res.data
}

// Orders
export const checkout = async (payload) => {
  if (USE_MOCK) {
    const newOrder = { 
      order_id: `ORD-MOCK-${Date.now()}`, 
      total_pembayaran: _cart.total_keseluruhan, 
      metode_bayar: payload.metode_bayar, 
      status: 'menunggu_konfirmasi_wa' 
    }
    _orders.push(newOrder)
    _cart.items = []
    _cart.total_keseluruhan = 0
    return mockRes(newOrder, 'Pesanan berhasil dibuat. Menunggu konfirmasi via WhatsApp.')
  }
  const res = await api.post('/orders/checkout', payload)
  return res.data
}

export const getOrders = async (params) => {
  if (USE_MOCK) {
    let items = [..._orders]
    if (params?.status) items = items.filter(o => o.status === params.status)
    return mockResList(items)
  }
  const res = await api.get('/orders', { params })
  return res.data
}

export const getOrderById = async (order_id) => {
  if (USE_MOCK) {
    const order = _orders.find(o => o.order_id === order_id)
    if (!order) return mockErr('Data tidak ditemukan', 404)
    return mockRes(order)
  }
  const res = await api.get(`/orders/${order_id}`)
  return res.data
}
