import { mande } from 'mande'

export interface ErrorResponse {
  status: {
    code: number
    message: string
  }
}

const token = localStorage.getItem('token')

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
export const api = mande(`${baseUrl.replace(/\/$/, '')}/api/v1`, {
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
})
