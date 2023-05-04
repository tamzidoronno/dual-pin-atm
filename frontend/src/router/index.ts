import { createRouter, createWebHistory } from 'vue-router'
import Register from '../components/Register.vue'
import Atm from '../components/Atm.vue'
import Accounts from '../components/Accounts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'atm',
      component: Atm
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: Accounts
    }
  ]
})

export default router
