export const mockChats = [
  {
    id: 88,
    user_id: 101,
    nama_user: 'Andi Pratama',
    role: 'siswa',
    subjek: 'Pesanan belum sampai',
    status: 'open',
    created_at: '2026-06-20T08:30:00Z',
    messages: [
      {
        sender_role: 'siswa',
        pesan: 'Pesanan saya ORD-20260620-0001 sudah 1 jam belum diambil pedagang',
        created_at: '2026-06-20T08:30:00Z',
      },
      {
        sender_role: 'admin',
        pesan: 'Baik, saya cek ke pedagang ya. Mohon ditunggu sebentar.',
        created_at: '2026-06-20T08:32:00Z',
      },
      {
        sender_role: 'siswa',
        pesan: 'Ok, terima kasih kak',
        created_at: '2026-06-20T08:33:00Z',
      },
    ],
  },
  {
    id: 89,
    user_id: 102,
    nama_user: 'Sari Dewi',
    role: 'siswa',
    subjek: 'Salah pesanan',
    status: 'closed',
    created_at: '2026-06-19T10:00:00Z',
    messages: [
      {
        sender_role: 'siswa',
        pesan: 'Saya pesan ayam geprek tapi yang datang nasi goreng',
        created_at: '2026-06-19T10:00:00Z',
      },
      {
        sender_role: 'admin',
        pesan: 'Maaf atas ketidaknyamanannya, sudah kami koordinasikan ke pedagang.',
        created_at: '2026-06-19T10:05:00Z',
      },
    ],
  },
]
