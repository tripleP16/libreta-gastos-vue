import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }, 
  {
    path:'/gastos/:id',
    name:'Gastos', 

    component: () => import('../views/Gastos.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
