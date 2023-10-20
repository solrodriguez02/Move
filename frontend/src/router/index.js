import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    }, 
    {
      path: '/explore',
      name: 'explore',
      component: () => import('@/views/Explore.vue')
    },
    {
      path: '/myroutines',
      name: 'my routines',
      component: () => import('@/views/MyRoutines.vue')
    },
    {
      path: '/exercise',
      name: 'exercise',
      component: () => import('@/views/Exercise.vue')
    },
    {
      path: '/createdbyyou',
      name: 'created by you',
      component: () => import('@/views/CreatedByYou.vue')
    },
    {
      path: '/createroutine',
      name: 'create routine',
      component: () => import('@/views/CreateRoutine.vue')
    },
    {
      path: '/saveroutine',
      name: 'save routine',
      component: () => import('@/views/SaveRoutine.vue')
    },
    {
      path: '/createexercise',
      name: 'create exercise',
      component: () => import('@/views/CreateExercise.vue')
    },
    {
      path: '/signin',
      name: 'sign in',
      component: () => import('@/views/SignIn.vue')
    },
    {
      path: '/signup',
      name: 'sign up',
      component: () => import('@/views/SignUp.vue')
    },
    {
      path: '/routine/:routineId',
      name: 'routine/:routineId',
      component: () => import('@/views/Routine.vue')
    },
    {
      path: '/editexercise',
      name: 'edit exercise',
      component: () => import('@/views/EditExercise.vue')
    },
    {
      path: '/userprofile',
      name: 'user profile',
      component: () => import('@/views/UserProfile.vue')
    },
    {
      path: '/myexercises',
      name: 'my exercises',
      component: () => import('@/views/MyExercises.vue')
    },
    {
      path: '/editprofile',
      name: 'edit profile',
      component: () => import('@/views/EditProfile.vue')
    },
    {
      path: '/verifyemail',
      name: 'verify email',
      component: () => import('@/views/VerifyEmail.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

export default router
