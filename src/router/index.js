import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/phone',
      name: 'phone',
      component: () => import('@/views/phone/index.vue')
      // 异步导入、路由懒加载
    },
    {
      path: '/erji',
      name: 'erji',
      component: () => import('@/views/erji/index.vue')
    }, 
    {
      path: '/province/:provinceName',
      name: 'province',
      component: () => import('@/views/province/index.vue'),
      props: true // 将路由参数映射到组件的props属性上
    }
  ],
})

export default router
