import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './views/Index.vue'
import Test from './views/Test.vue'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    { path: '*', component: Test },
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/share',
      name: 'share',
      component: () => import(/* webpackChunkName: "Share" */ './views/Share.vue')
    },
    {
      path: '/grow',
      name: 'grow',
      component: () => import(/* webpackChunkName: "Grow" */ './views/Grow.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import(/* webpackChunkName: "Test" */ './views/Test.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 100 }
  }
})
