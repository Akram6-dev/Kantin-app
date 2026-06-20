import api from './api'
import { USE_MOCK, mockRes, mockErr } from '../mock/mockResponse'
import { mockChats } from '../mock/chats'

let _chats = [...mockChats]

export const sendMessage = async (subjek, pesan) => {
  if (USE_MOCK) {
    const newChat = { 
      chat_id: Date.now(), 
      subjek, 
      status: 'open', 
      messages: [{ sender_role: 'siswa', pesan, created_at: new Date().toISOString() }] 
    }
    _chats.push(newChat)
    return mockRes(newChat, 'Pesan terkirim ke Admin')
  }
  const res = await api.post('/chat/messages', { subjek, pesan })
  return res.data
}

export const getChatHistory = async (chat_id) => {
  if (USE_MOCK) {
    const chat = _chats.find(c => c.chat_id === parseInt(chat_id))
    if (!chat) return mockErr('Chat tidak ditemukan', 404)
    return mockRes(chat)
  }
  const res = await api.get(`/chat/${chat_id}/messages`)
  return res.data
}

export const replyChat = async (chat_id, pesan) => {
  if (USE_MOCK) {
    const chat = _chats.find(c => c.chat_id === parseInt(chat_id))
    if (!chat) return mockErr('Chat tidak ditemukan', 404)
    chat.messages.push({ sender_role: 'admin', pesan, created_at: new Date().toISOString() })
    return mockRes({ chat_id }, 'Balasan terkirim')
  }
  const res = await api.post(`/chat/${chat_id}/reply`, { pesan })
  return res.data
}

export const closeChat = async (chat_id) => {
  if (USE_MOCK) {
    const chat = _chats.find(c => c.chat_id === parseInt(chat_id))
    if (!chat) return mockErr('Chat tidak ada', 404)
    chat.status = 'closed'
    return mockRes({ chat_id, status: 'closed' }, 'Komplain ditutup')
  }
  const res = await api.patch(`/chat/${chat_id}/close`)
  return res.data
}
