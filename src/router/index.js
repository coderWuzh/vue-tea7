import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { Toast } from 'vant'

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../views/My.vue')
  }, {
    path: '/ad',
    name: 'Ad',
    component: () => import('../views/Ad.vue')
  },
  {
    path: '/search',
    component: () => import('../views/Search.vue'),
    children: [
      {
        path: '',
        redirect: 'searchmenu'
      },
      {
        path: 'searchmenu',
        name: 'Searchmenu',
        component: () => import('../views/Search/SearchMenu.vue'),
      },
      {
        path: 'searchlist',
        name: 'Searchlist',
        component: () => import('../views/Search/SearchList.vue'),
      },
    ]
  }, {
    path: '/detail',
    name: 'Detail',
    meta: {
      keepAlive: true
    },
    component: () => import('../views/Detail.vue')
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
  }, {
    path: '/codeLogin',
    name: 'CodeLogin',
    component: () => import('../views/login/CodeLogin.vue')
  }, {
    path: '/register',
    name: 'Register',
    component: () => import('../views/login/Register.vue')
  }, {
    path: '/recovery',
    name: 'Recovery',
    component: () => import('../views/login/Recovery.vue')
  },
  {
    path: '/recoveryNext',
    name: 'RecoveryNext',
    component: () => import('../views/login/RecoveryNext.vue')
  }, {
    path: '/addressIndex',
    name: 'AddressIndex',
    component: () => import('../views/Address/AddressIndex.vue')
  }, {
    path: '/addAddress',
    name: 'AddAddress',
    component: () => import('../views/Address/AddAddress.vue')
  }, {
    path: '/changeAddress',
    name: 'ChangeAddress',
    component: () => import('../views/Address/ChangeAddress.vue')
  }, {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue')
  }, {
    path: '/payment',
    name: 'Payment',
    component: () => import('../views/Payment.vue')
  },

]


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let nextRoute = ['Cart', 'AddressIndex', 'Order', 'Payment', 'AddAddress', 'ChangeAddress']
  let userInfo = localStorage.getItem('teaUserInfo')
  if (nextRoute.indexOf(to.name) >= 0) {
    if (!userInfo) {
      Toast('请先登录')
      router.push('/login')
    }
  }
  next()
})

export default router
