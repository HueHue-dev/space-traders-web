import { createRouter, createWebHistory, type RouteRecordNameGeneric } from 'vue-router'
import AgentLogin from '../views/AgentLogin.vue'
import Dashboard from '@/views/Dashboard.vue'
import Account from '@/views/Account.vue'
import AccountLogin from '@/views/AccountLogin.vue'
import Factions from '@/views/Factions.vue'
import Contracts from '@/views/Contracts.vue'
import { authService } from '@/services/AuthService.ts'
import { configService } from '@/services/ConfigService.ts'
import Agents from '@/views/Agents.vue'

const requireAccountAuthRoute: RouteRecordNameGeneric[] = ['Account']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Dashboard, name: 'Dashboard', meta: { requiresAuth: true, title: 'Dashboard'} },
    { path: '/account', component: Account, name: 'Account', meta: { requiresAuth: true, title: 'Account' } },
    { path: '/agents', component: Agents, name: 'Agents', meta: { requiresAuth: true, title: 'Agents' } },
    { path: '/factions', component: Factions, name: 'Factions', meta: { requiresAuth: true, title: 'Factions' } },
    { path: '/contracts', component: Contracts, name: 'Contracts', meta: { requiresAuth: true, title: 'Contracts' } },
    { path: '/account/login', component: AccountLogin, name: 'AccountLogin', meta: { title: 'Account Login' } },
    { path: '/agent/login', component: AgentLogin, name: 'AgentLogin', meta: { title: 'Agent Login' } },
    {
      path: '/logout',
      component: {},
      name: 'Logout',
      meta: { title: 'Logout' },
      beforeEnter: () => {
        authService.clearAll()
        router.push('/')
      },
    },
  ],
})

router.beforeEach(async (to) => {
  if (
    to.meta.requiresAuth &&
    requireAccountAuthRoute.includes(to.name) &&
    !authService.isAccountAuthenticated()
  ) {
    document.title = 'Space Traders - Account Login'
    return '/account/login'
  }
  if (to.meta.requiresAuth && !authService.isAgentAuthenticated()) {
    document.title = 'Space Traders - Agent Login'
    return '/agent/login'
  }
  if(to.name === undefined) {
    configService.setActiveMenu('Dashboard')
    document.title = 'Space Traders - Dashboard'
    return '/'
  }
  document.title = 'Space Traders - ' + to.name.toString()
})

export default router
