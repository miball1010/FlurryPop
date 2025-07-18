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
          component: () => import('../views/user/Checkout.vue'),
          children: [
            {
              path: '',
              name: 'user-checkout-step1',
              component: () => import('../views/user/Step1.vue'),
            },
            {
              path: 'step1',
              name: 'user-checkout-step1',
              component: () => import('../views/user/Step1.vue'),
            },
            {
              path: 'step2',
              name: 'user-checkout-step2',
              component: () => import('../views/user/Step2.vue'),
            },
            {
              path: 'step3',
              name: 'user-checkout-step3',
              component: () => import('../views/user/Step3.vue'),
            }
          ]
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
        }
      ]
    },
    {
      //重新導向
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
