import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginCom from '@/components/LoginCom.vue'
import MainView from '@/components/MainView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginCom
  },
  {
    path: '/dummy',
    name: 'dummy',
    component: () => import(/* webpackChunkName: "about" */ '../views/DummyView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: MainView
  },
  {
    path: '/search',
    name: 'search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchView.vue')
  },
  {
    path: '/mypage',
    name: 'mypage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MypageView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
