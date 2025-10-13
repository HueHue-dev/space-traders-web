import { createRouter, createWebHistory, type RouteRecordNameGeneric } from 'vue-router'
import AgentLogin from '../views/AgentLogin.vue'
import Dashboard from '@/views/Dashboard.vue'
import Account from '@/views/Account.vue'
import AccountLogin from '@/views/AccountLogin.vue'
import Factions from '@/views/Factions.vue'
import Contracts from '@/views/Contracts.vue'
import { authService } from '@/services/AuthService.ts'
import { configService } from '@/services/ConfigService.ts'

const requireAccountAuthRoute: RouteRecordNameGeneric[] = ['Account']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Dashboard, name: 'Dashboard', meta: { requiresAuth: true } },
    { path: '/account', component: Account, name: 'Account', meta: { requiresAuth: true } },
    { path: '/factions', component: Factions, name: 'Factions', meta: { requiresAuth: true } },
    { path: '/contracts', component: Contracts, name: 'Contracts', meta: { requiresAuth: true } },
    { path: '/account/login', component: AccountLogin, name: 'AccountLogin' },
    { path: '/agent/login', component: AgentLogin, name: 'AgentLogin' },
    {
      path: '/logout',
      component: {},
      name: 'Logout',
      beforeEnter: () => {
        authService.clearAll()
      },
    },
  ],
})

router.beforeEach(async (to) => {
  if (
    to.meta.requiresAuth &&
    requireAccountAuthRoute.includes(to.name) &&
    !authService.isAgentAuthenticated()
  ) {
    return '/account/login'
  }
  if (to.meta.requiresAuth && !authService.isAgentAuthenticated()) {
    return '/agent/login'
  }
  if(to.name === undefined) {
    configService.setActiveMenu('Dashboard')

    return '/'
  }
})

export default router
