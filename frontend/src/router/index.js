import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    }, 
    {
      path: '/explore',
      name: 'explore',
      component: () => import('../views/Explore.vue')
    },
    {
      path: '/myroutines',
      name: 'myroutines',
      component: () => import('../views/MyRoutines.vue')
    },
    {
      path: '/exercise',
      name: 'exercise',
      component: () => import('../views/Exercise.vue')
    },
    {
      path: '/createdbyyou',
      name: 'createdbyyou',
      component: () => import('../views/CreatedByYou.vue')
    },
    {
      path: '/createroutine',
      name: 'create routine',
      component: () => import('../views/CreateRoutine.vue')
    },
    {
      path: '/./:pathMatch(.*)*',
      name: 'not fount',
      component: NotFound
    }
  ]
})

export default router
