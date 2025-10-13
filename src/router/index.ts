import { createRouter, createWebHistory, type RouteRecordNameGeneric } from 'vue-router'
import { useAccountStore } from '@/stores/account.ts'
import AgentLogin from '../views/AgentLogin.vue'
import Dashboard from '@/views/Dashboard.vue'
import Account from '@/views/Account.vue'
import AccountLogin from '@/views/AccountLogin.vue'
import { useAgentStore } from '@/stores/agent.ts'
import Factions from '@/views/Factions.vue'

const requireAccountAuthRoute: RouteRecordNameGeneric[] = ['Account'];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Dashboard, name: 'Dashboard', meta: { requiresAuth: true } },
    { path: '/account', component: Account, name: 'Account', meta: { requiresAuth: true } },
    { path: '/factions', component: Factions, name: 'Factions', meta: { requiresAuth: true } },
    { path: '/account/login', component: AccountLogin, name: 'AccountLogin' },
    { path: '/agent/login', component: AgentLogin, name: 'AgentLogin' },
  ],
})

router.beforeEach(async (to) => {
  const account = useAccountStore()
  const agent = useAgentStore()

  if (to.meta.requiresAuth && requireAccountAuthRoute.includes(to.name) && !account.isAuthenticated) {
    return '/account/login'
  }
  if (to.meta.requiresAuth && !agent.isAuthenticated) {
    return '/agent/login'
  }
})

export default router
