import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/menu', component: () => import('@/views/Home.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
