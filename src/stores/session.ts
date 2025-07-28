import type { User } from '@/api/auth'
import { login, logout, me, setToken, clearToken } from '@/api/auth'
import router from '@/router'
import type { MandeError } from 'mande'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
  const user = ref<User | null>(null)
  const isInitialized = ref(false)

  const _me = async () => {
    user.value = await me()
  }

  const _login = async (email: string, password: string) => {
    user.value = await login(email, password)
    router.push((router.currentRoute.value.query.returnTo as string) || '/')
  }

  const _logout = async () => {
    await logout()
    user.value = null
    router.push('/login')
  }

  // Initialize user from localStorage token
  const _initializeUser = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      setToken(token)
      try {
        await _me()
      } catch (error) {
        if (error && typeof error === 'object' && 'response' in error) {
          const mandeError = error as MandeError
          if (mandeError.response.status === 401) {
            clearToken()
          }
        } else {
          throw error
        }
      }
    }
    isInitialized.value = true
  }

  // Start initialization
  const initPromise = _initializeUser()

  return {
    user,
    login: _login,
    logout: _logout,
    me: _me,
    isInitialized,
    initPromise,
  }
})

// TODO: Show toast on error
