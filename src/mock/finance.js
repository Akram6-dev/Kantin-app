export const mockFinanceDashboard = {
  total_pendapatan: 45230000,
  total_transaksi: 1820,
  grafik_batang: {
    label: 'Pendapatan per Hari',
    items: [
      { tanggal: '2026-06-01', total: 1500000 },
      { tanggal: '2026-06-02', total: 1750000 },
      { tanggal: '2026-06-03', total: 1200000 },
      { tanggal: '2026-06-04', total: 1900000 },
      { tanggal: '2026-06-05', total: 2100000 },
      { tanggal: '2026-06-06', total: 1650000 },
      { tanggal: '2026-06-07', total: 1800000 },
      { tanggal: '2026-06-08', total: 2050000 },
      { tanggal: '2026-06-09', total: 1950000 },
      { tanggal: '2026-06-10', total: 2200000 },
    ],
  },
  grafik_bulat: {
    label: 'Kontribusi Pendapatan per Stand',
    items: [
      { nama_stand: 'Kantin Bu Siti', total: 18500000, persentase: 40.9 },
      { nama_stand: 'Stand Mie Ayam Pak Joko', total: 12000000, persentase: 26.5 },
      { nama_stand: 'Stand Seblak Mang Asep', total: 14730000, persentase: 32.6 },
    ],
  },
}

export const mockMerchantIncome = {
  total_pendapatan: 2350000,
  total_pesanan: 156,
  grafik_batang: {
    items: [
      { tanggal: '2026-06-15', total: 320000 },
      { tanggal: '2026-06-16', total: 410000 },
      { tanggal: '2026-06-17', total: 280000 },
      { tanggal: '2026-06-18', total: 390000 },
      { tanggal: '2026-06-19', total: 450000 },
      { tanggal: '2026-06-20', total: 500000 },
    ],
  },
}
