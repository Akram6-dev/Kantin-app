import api from './api'
import { USE_MOCK, mockRes, mockResList, mockErr } from '../mock/mockResponse'
import { mockUsers } from '../mock/users'
import { mockFinanceDashboard } from '../mock/finance'
import { mockChats } from '../mock/chats'
import { mockNisn, mockOperationalHours } from '../mock/misc'

let _users = [...mockUsers]

// Users
export const getUsers = async (params) => {
  if (USE_MOCK) {
    let items = [..._users]
    if (params?.role) items = items.filter((u) => u.role === params.role)
    if (params?.status) items = items.filter((u) => u.status_akun === params.status)
    if (params?.search) items = items.filter((u) => u.nama.toLowerCase().includes(params.search.toLowerCase()))
    return mockResList(items)
  }
  const res = await api.get('/admin/users', { params })
  return res.data
}

export const getUserById = async (id) => {
  if (USE_MOCK) {
    const user = _users.find((u) => u.id === id)
    if (!user) return mockErr('Data tidak ditemukan', 404)
    return mockRes(user)
  }
  const res = await api.get(`/admin/users/${id}`)
  return res.data
}

export const updateUser = async (id, payload) => {
  if (USE_MOCK) {
    const idx = _users.findIndex((u) => u.id === id)
    if (idx === -1) return mockErr('Data tidak ditemukan', 404)
    _users[idx] = { ..._users[idx], ...payload }
    return mockRes(_users[idx], 'Akun berhasil diperbarui')
  }
  const res = await api.put(`/admin/users/${id}`, payload)
  return res.data
}

export const deleteUser = async (id) => {
  if (USE_MOCK) {
    _users = _users.filter((u) => u.id !== id)
    return mockRes(null, 'Akun berhasil dihapus')
  }
  const res = await api.delete(`/admin/users/${id}`)
  return res.data
}

export const updateUserStatus = async (id, status_akun, alasan) => {
  if (USE_MOCK) {
    const idx = _users.findIndex((u) => u.id === id)
    if (idx === -1) return mockErr('Data tidak ditemukan', 404)
    _users[idx].status_akun = status_akun
    return mockRes(null, `Status akun berhasil diubah menjadi ${status_akun}`)
  }
  const res = await api.patch(`/admin/users/${id}/status`, { status_akun, alasan })
  return res.data
}

export const moderatePhoto = async (id, alasan) => {
  if (USE_MOCK) {
    return mockRes(
      { user_id: id, warning_sent_at: new Date().toISOString(), auto_freeze_at: new Date(Date.now() + 86400000).toISOString(), wa_message_id: 'wamid.MOCK001' },
      'Peringatan terkirim ke WhatsApp pengguna. Akun akan otomatis freeze dalam 24 jam jika tidak diperbarui.'
    )
  }
  const res = await api.post(`/admin/users/${id}/moderate-photo`, { alasan })
  return res.data
}

// Merchants
export const buatAkunPedagang = async (payload) => {
  if (USE_MOCK) {
    const newMerchant = { id: Date.now(), ...payload, role: 'pedagang', status_akun: 'active' }
    _users.push(newMerchant)
    return mockRes(newMerchant, 'Akun pedagang berhasil dibuat')
  }
  const res = await api.post('/admin/merchants', payload)
  return res.data
}

// NISN
let _nisn = [...mockNisn]

export const importNisn = async (formData) => {
  if (USE_MOCK) {
    return mockRes({ total_baris: 10, berhasil: 10, gagal: 0, detail_gagal: [] }, 'Import data NISN berhasil')
  }
  const res = await api.post('/admin/nisn/import', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  return res.data
}

export const getNisn = async (params) => {
  if (USE_MOCK) {
    let items = [..._nisn]
    if (params?.search) items = items.filter((n) => n.nama.toLowerCase().includes(params.search.toLowerCase()) || n.nisn.includes(params.search))
    return mockResList(items)
  }
  const res = await api.get('/admin/nisn', { params })
  return res.data
}

// Operational Hours
let _operationalHours = { ...mockOperationalHours }

export const getOperationalHours = async () => {
  if (USE_MOCK) return mockRes(_operationalHours)
  const res = await api.get('/admin/settings/operational-hours')
  return res.data
}

export const updateOperationalHours = async (payload) => {
  if (USE_MOCK) {
    _operationalHours = { ..._operationalHours, ...payload }
    return mockRes(_operationalHours, 'Jam operasional kantin berhasil diperbarui')
  }
  const res = await api.put('/admin/settings/operational-hours', payload)
  return res.data
}

// Finance Reports
export const getFinanceDashboard = async (params) => {
  if (USE_MOCK) return mockRes(mockFinanceDashboard)
  const res = await api.get('/admin/reports/finance/dashboard', { params })
  return res.data
}

export const exportFinance = async (params) => {
  if (USE_MOCK) {
    return mockRes({ file_url: 'https://cdn.kantin.sch.id/reports/mock-laporan.xlsx', generated_at: new Date().toISOString() }, 'File laporan berhasil dibuat')
  }
  const res = await api.get('/admin/reports/finance/export', { params })
  return res.data
}

export const importFinance = async (formData) => {
  if (USE_MOCK) return mockRes({ total_baris: 150, berhasil: 150, gagal: 0 }, 'Data penghasilan berhasil diimpor')
  const res = await api.post('/admin/reports/finance/import', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  return res.data
}

// Complaints
export const getComplaints = async (params) => {
  if (USE_MOCK) {
    let items = mockChats.map((c) => {
      const item = { ...c }
      delete item.messages
      return item
    })
    if (params?.status) items = items.filter((c) => c.status === params.status)
    return mockResList(items)
  }
  const res = await api.get('/admin/complaints', { params })
  return res.data
}
