export const mockChatbotLogs = [
  {
    wa_message_id: 'wamid.HBgN001',
    tipe: 'order-confirmation',
    tujuan: '081234567890',
    status_kirim: 'delivered',
    created_at: '2026-06-20T07:15:30Z',
  },
  {
    wa_message_id: 'wamid.HBgN002',
    tipe: 'order-ready',
    tujuan: '081234567890',
    status_kirim: 'delivered',
    created_at: '2026-06-20T07:45:00Z',
  },
  {
    wa_message_id: 'wamid.HBgN003',
    tipe: 'photo-warning',
    tujuan: '081234567892',
    status_kirim: 'delivered',
    created_at: '2026-06-20T09:00:00Z',
  },
  {
    wa_message_id: 'wamid.HBgN004',
    tipe: 'order-confirmation',
    tujuan: '081234567891',
    status_kirim: 'failed',
    created_at: '2026-06-20T08:30:00Z',
  },
]

export const mockNisn = [
  { nisn: '0051234567', nama: 'Andi Pratama', kelas: '9A', is_registered: true },
  { nisn: '0059876543', nama: 'Sari Dewi', kelas: '8B', is_registered: true },
  { nisn: '0051112223', nama: 'Rizky Maulana', kelas: '7C', is_registered: true },
  { nisn: '0054445556', nama: 'Dewi Kartika', kelas: '9B', is_registered: false },
  { nisn: '0057778889', nama: 'Fajar Nugroho', kelas: '8A', is_registered: false },
  { nisn: '0053334445', nama: 'Indah Permata', kelas: '7A', is_registered: false },
]

export const mockOperationalHours = {
  jam_buka: '06:30',
  jam_tutup: '15:00',
  hari_aktif: ['senin', 'selasa', 'rabu', 'kamis', 'jumat'],
  status_saat_ini: 'buka',
}
