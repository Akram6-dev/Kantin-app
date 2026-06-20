export const mockOrders = [
  {
    order_id: 'ORD-20260620-0001',
    status: 'selesai',
    status_label: 'Pesanan selesai dan sudah diambil',
    total_pembayaran: 40000,
    metode_bayar: 'QRIS',
    created_at: '2026-06-20T07:15:00Z',
    items: [
      { stand: 'Kantin Bu Siti', produk: 'Nasi Goreng Spesial', qty: 2, subtotal: 30000 },
      { stand: 'Stand Mie Ayam Pak Joko', produk: 'Mie Ayam', qty: 1, subtotal: 10000 },
    ],
    timeline: [
      { status: 'dibuat', timestamp: '2026-06-20T07:15:00Z' },
      { status: 'dikonfirmasi_wa', timestamp: '2026-06-20T07:16:30Z' },
      { status: 'diproses', timestamp: '2026-06-20T07:17:00Z' },
      { status: 'siap_diambil', timestamp: '2026-06-20T07:45:00Z' },
      { status: 'selesai', timestamp: '2026-06-20T07:50:00Z' },
    ],
  },
  {
    order_id: 'ORD-20260620-0002',
    status: 'diproses',
    status_label: 'Pesanan sedang disiapkan pedagang',
    total_pembayaran: 18000,
    metode_bayar: 'Dana',
    created_at: '2026-06-20T08:00:00Z',
    items: [
      { stand: 'Kantin Bu Siti', produk: 'Ayam Geprek', qty: 1, subtotal: 18000 },
    ],
    timeline: [
      { status: 'dibuat', timestamp: '2026-06-20T08:00:00Z' },
      { status: 'dikonfirmasi_wa', timestamp: '2026-06-20T08:01:00Z' },
      { status: 'diproses', timestamp: '2026-06-20T08:02:00Z' },
    ],
  },
  {
    order_id: 'ORD-20260620-0003',
    status: 'menunggu_konfirmasi_wa',
    status_label: 'Menunggu konfirmasi via WhatsApp',
    total_pembayaran: 26000,
    metode_bayar: 'Tunai',
    created_at: '2026-06-20T08:30:00Z',
    items: [
      { stand: 'Stand Mie Ayam Pak Joko', produk: 'Mie Ayam Bakso', qty: 2, subtotal: 26000 },
    ],
    timeline: [
      { status: 'dibuat', timestamp: '2026-06-20T08:30:00Z' },
    ],
  },
  {
    order_id: 'ORD-20260619-0010',
    status: 'dibatalkan_tidak_dikonfirmasi',
    status_label: 'Pesanan dibatalkan karena tidak dikonfirmasi',
    total_pembayaran: 10000,
    metode_bayar: 'Tunai',
    created_at: '2026-06-19T10:00:00Z',
    items: [
      { stand: 'Stand Mie Ayam Pak Joko', produk: 'Mie Ayam', qty: 1, subtotal: 10000 },
    ],
    timeline: [
      { status: 'dibuat', timestamp: '2026-06-19T10:00:00Z' },
      { status: 'dibatalkan_tidak_dikonfirmasi', timestamp: '2026-06-19T10:15:00Z' },
    ],
  },
  {
    order_id: 'ORD-20260619-0011',
    status: 'warning_refund_tunai',
    status_label: 'Menunggu pengembalian dana tunai dari pedagang',
    total_pembayaran: 15000,
    metode_bayar: 'QRIS',
    created_at: '2026-06-19T11:00:00Z',
    items: [
      { stand: 'Kantin Bu Siti', produk: 'Nasi Goreng Spesial', qty: 1, subtotal: 15000 },
    ],
    timeline: [
      { status: 'dibuat', timestamp: '2026-06-19T11:00:00Z' },
      { status: 'warning_refund_tunai', timestamp: '2026-06-19T11:05:00Z' },
    ],
  },
]

// untuk dashboard pedagang
export const mockMerchantOrders = [
  {
    order_id: 'ORD-20260620-0001',
    nama_pemesan: 'Andi Pratama',
    role_pemesan: 'siswa',
    items: [
      { product_id: 501, nama: 'Nasi Goreng Spesial', qty: 2, subtotal: 30000 },
    ],
    status: 'selesai',
    metode_bayar: 'QRIS',
    created_at: '2026-06-20T07:15:00Z',
  },
  {
    order_id: 'ORD-20260620-0002',
    nama_pemesan: 'Sari Dewi',
    role_pemesan: 'siswa',
    items: [
      { product_id: 502, nama: 'Ayam Geprek', qty: 1, subtotal: 18000 },
    ],
    status: 'diproses',
    metode_bayar: 'Dana',
    created_at: '2026-06-20T08:00:00Z',
  },
]
