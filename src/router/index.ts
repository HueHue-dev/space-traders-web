import { createRouter, createWebHistory } from 'vue-router'
import { useAccountStore } from '@/stores/account.ts'
import Login from '../views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Dashboard, name: 'Dashboard', meta: { requiresAuth: true } },
    { path: '/login', component: Login, name: 'Login' },
  ],
})

router.beforeEach(async (to) => {
  const account = useAccountStore()
  console.log(account)
  if (to.meta.requiresAuth && !account.isAuthenticated) {
    return '/login'
  }
})

export default router
