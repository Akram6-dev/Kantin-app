import api from './api'

export const getUsers = async () => {
  const res = await api.get('/admin/users')
  return res.data
}

export const reportFoto = async (userId) => {
  const res = await api.post(`/admin/users/${userId}/report-foto`)
  return res.data
}

export const freezeUser = async (userId, alasan) => {
  const res = await api.post(`/admin/users/${userId}/freeze`, { alasan })
  return res.data
}

export const buatAkunPedagang = async (payload) => {
  const res = await api.post('/admin/pedagang/buat-akun', payload)
  return res.data
}

export const exportFinance = async (bulan, tahun) => {
  const res = await api.get('/admin/finance/export', {
    params: { bulan, tahun },
    responseType: 'blob',
  })

  const url = window.URL.createObjectURL(res.data)
  const link = document.createElement('a')
  link.href = url
  link.download = `laporan-kantin-${bulan}-${tahun}.xlsx`
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)

  return res.data
}

export const updateOperational = async (payload) => {
  const res = await api.put('/admin/system/operational', payload)
  return res.data
}
