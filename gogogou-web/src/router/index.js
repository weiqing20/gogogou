import { nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
  }, {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
  }, {
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList')
  }, {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderList" */ '../views/orderList/OrderList')
  }, {
    path: '/mine',
    name: 'Mine',
    component: () => import(/* webpackChunkName: "mine" */ '../views/mine/Mine')
  }, {
    path: '/address/address',
    name: 'Address',
    component: () => import(/* webpackChunkName: "address/address" */ '../views/address/Address')
  }, {
    path: '/address/create',
    name: 'CreateAddress',
    component: () => import(/* webpackChunkName: "address/create" */ '../views/address/CreateAddress')
  }, {
    path: '/address/edit',
    name: 'EditAddress',
    component: () => import(/* webpackChunkName: "address/edit" */ '../views/address/EditAddress')
  }, {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation')
  }, {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home' }) : next();
    }
  }, {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home' }) : next();
    }
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage;
  (!isLogin && (to.name !== 'Login' && to.name !== 'Register')) ? next({ name: 'Login' }) : next();
})

export default router
