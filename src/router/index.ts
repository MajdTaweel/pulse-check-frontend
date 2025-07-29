import { useSessionStore } from '@/stores/session'
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import HomeView from '../views/HomeView.vue'
import MonitorDetailsView from '@/views/MonitorDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: AppLayout,
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: AuthLayout,
        requiresAuth: false,
      },
      component: () => import('@/views/auth/LoginView.vue'),
    },
    {
      path: '/monitors/:id',
      name: 'monitor-details',
      component: MonitorDetailsView,
      meta: {
        layout: AppLayout,
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach(async (to) => {
  const sessionStore = useSessionStore()

  // Wait for store initialization
  if (!sessionStore.isInitialized) {
    await sessionStore.initPromise
  }

  if (to.name === 'login' && sessionStore.user) {
    return { name: 'home' }
  }

  if (to.meta.requiresAuth && !sessionStore.user) {
    return { name: 'login', query: { returnTo: to.fullPath } }
  }
})

export default router
