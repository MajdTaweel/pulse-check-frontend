import { mande } from 'mande'

export interface ErrorResponse {
  status: {
    code: number
    message: string
  }
}

const token = localStorage.getItem('token')

export const api = mande('http://localhost:3000/api/v1', {
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
})
