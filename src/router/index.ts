import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChartsView from '@/views/ChartsView.vue'
import UsersView from '@/views/UsersView.vue'
import GlobalView from '@/views/GlobalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
    },
    {
      path: '/global',
      name: 'global',
      component: GlobalView,
    },
    {
      path: '/charts',
      name: 'charts',
      component: ChartsView,
    },
  ],
})

export default router
