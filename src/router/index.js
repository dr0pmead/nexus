import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/loginMain.vue'
import DashboardNexus from '@/views/dashboardNexus'
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardNexus,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
