import api from './api'
import { USE_MOCK, mockRes, mockResList } from '../mock/mockResponse'
import { mockChatbotLogs } from '../mock/misc'

export const webhookOrderConfirmation = async (payload) => {
  if (USE_MOCK) return mockRes({ order_id: payload.order_id, status: 'diproses' }, 'Konfirmasi diterima, pesanan diteruskan ke pedagang')
  const res = await api.post('/chatbot/webhook/order-confirmation', payload)
  return res.data
}

export const sendOrderConfirmation = async (payload) => {
  if (USE_MOCK) return mockRes({ order_id: payload.order_id }, 'Pesan WA konfirmasi terkirim')
  const res = await api.post('/chatbot/send/order-confirmation', payload)
  return res.data
}

export const sendOrderReady = async (payload) => {
  if (USE_MOCK) return mockRes({ order_id: payload.order_id }, 'Pesan WA pesanan siap terkirim')
  const res = await api.post('/chatbot/send/order-ready', payload)
  return res.data
}

export const sendPhotoWarning = async (payload) => {
  if (USE_MOCK) return mockRes({ user_id: payload.user_id }, 'Pesan WA peringatan foto terkirim')
  const res = await api.post('/chatbot/send/photo-warning', payload)
  return res.data
}

export const getChatbotLogs = async (params) => {
  if (USE_MOCK) return mockResList(mockChatbotLogs)
  const res = await api.get('/chatbot/logs', { params })
  return res.data
}
