import axios from 'axios'
import api from './api'

export const sendWebhookResponse = async (payload, apiKey) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/webhook/whatsapp`,
    payload,
    { headers: { 'X-API-KEY': apiKey } }
  )
  return res.data
}

export const triggerBroadcastBuka = async () => {
  const res = await api.post('/system/trigger-broadcast-buka')
  return res.data
}
