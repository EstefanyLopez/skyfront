import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import DashboardView from '@/views/privates/DashboardView.vue'
import { storeToRefs } from 'pinia';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path:'/',
      component:()=>import('@/views/publics/LoginView.vue'),
      name:'login'
    },
    {
      path: '/system',
      name:'system',
      component: DashboardView,
      meta: {
        requiresAuth: true
      }
      ,
      
      children: [
        {
          path:'',
          component:()=>import('@/views/privates/NewsView.vue'),
          name:'visitas',
          meta: {
            requiresAuth: true
          }
        },
        {
          path:'/users',
          component:()=>import('@/views/privates/UserView.vue'),
          name:'users',
          meta: {
            requiresAuth: true
          }
        },
        {
          path:'/customer',
          component:()=>import('../pages/Customer.vue'),
          name:'customer',
          meta:{
            requiresAuth:true
          }
        }
      ],
    },
  ],
})
router.beforeEach((to, from, next) => {
 const {isAuthenticated} = storeToRefs(useAuthStore())
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
