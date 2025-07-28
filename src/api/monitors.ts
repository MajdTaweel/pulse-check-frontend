import { api } from './api'

export interface Monitor {
  id: number
  name: string
  url: string
  check_interval: number
  last_checked_at: string
  last_status: 'pending' | 'up' | 'down'
  created_at: string
  updated_at: string
}

export const listMonitors = async () => {
  return await api.get<Monitor[]>('/monitored_urls')
}
