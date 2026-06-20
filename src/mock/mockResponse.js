export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

// simulasi network delay
const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms))

export const mockRes = async (data, message = 'Berhasil') => {
  await delay()
  return { success: true, message, data }
}

export const mockResList = async (items, message = 'Berhasil') => {
  await delay()
  return {
    success: true,
    message,
    data: {
      items,
      pagination: { current_page: 1, total_page: 1, total_data: items.length },
    },
  }
}

export const mockErr = async (message, status = 400) => {
  await delay()
  const err = new Error(message)
  err.response = { data: { success: false, message }, status }
  throw err
}
