import { createRouter, createWebHashHistory } from 'vue-router'
import FrontLayout from '../views/FrontLayout.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: FrontLayout,
      children: [
        {
          path: '',
          name: 'user-home',
          component: () => import('../views/user/Home.vue')
        },
        {
          path: 'about',
          name: 'user-about',
          component: () => import('../views/user/About.vue')
        },
        {
          path: 'product',
          name: 'user-product',
          component: () => import('../views/user/Product.vue')
        },
        {
          path: 'product/:productId',
          component: () => import('../views/user/ProductPage.vue')
        },
        {
          path: 'order',
          name: 'user-order',
          component: () => import('../views/user/Order.vue')
        },
        {
          path: 'QA',
          name: 'user-QA',
          component: () => import('../views/user/QA.vue')
        },
        {
          path: 'favorite',
          name: 'user-favorite',
          component: () => import('../views/user/Favorite.vue')
        },
        {
          path: 'checkout',
          name: 'user-checkout',
          component: () => import('../views/user/Checkout.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'admin-login',
      component: () => import('../views/admin/Login.vue'),
    },
    {
      path: '/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/admin/Dashboard.vue'),
      children: [
        {
          path: 'product',
          name: 'admin-product',
          component: () => import('../views/admin/Products.vue')
        },
        {
          path: 'order',
          name: 'admin-order',
          component: () => import('../views/admin/Orders.vue')
        },
        {
          path: 'coupon',
          name: 'admin-coupon',
          component: () => import('../views/admin/Coupons.vue')
        }
      ]
    },
    {
    //重新導向
     path: '/:pathMatch(.*)*',
     redirect: '/'
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/Test.vue'),
    }
  ]
})

export default router
