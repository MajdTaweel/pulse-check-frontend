import { api } from './api'

export interface User {
  id: number
  name: string
  email: string
}

interface LoginResponse {
  user: User
  token: string
}

export function setToken(token: string) {
  api.options.headers.Authorization = `Bearer ${token}`
  localStorage.setItem('token', token)
}

export function clearToken() {
  delete api.options.headers.Authorization
  localStorage.removeItem('token')
}

export const login = async (email: string, password: string) => {
  const response = await api.post<LoginResponse>('/login', { user: { email, password } })

  setToken(response.token)

  return response.user
}

export const logout = async () => {
  await api.post('/logout')
  clearToken()
}

export const me = async () => {
  const response = await api.get<Omit<LoginResponse, 'token'>>('me')
  return response.user
}
