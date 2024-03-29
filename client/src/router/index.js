import Vue from 'vue'
import VueRouter from 'vue-router'
import p from './public'
import m from './main'
import e from './error'

Vue.use(VueRouter)

const routes = [
  p,
  m,
  e
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
