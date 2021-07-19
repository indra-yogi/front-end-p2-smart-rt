import Vue from 'vue'
import VueRouter from 'vue-router'

//import halaman
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import InfoPerkawinan from '../views/InformasiPerkawinan.vue'
import DataPerkawinan from '../views/DataPerkawinan.vue'
import DataPerceraian from '../views/DataPerceraian.vue'
import AddPerceraian from '../views/AddPerceraian.vue'
import AddPerkawinan from '../views/AddPerkawinan.vue'
import Register from '../views/Register.vue'
import DataUser from '../views/DataUser.vue'
import Administrators from '../views/Administrators.vue'
import AddAdmin from '../views/AddAdmin.vue'
import SuratPerkawinan from '../views/SuratPerkawinan.vue'
import SuratPerceraian from '../views/SuratPerceraian.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      guest: true
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      auth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/infoPerkawinan',
    name: 'InfoPerkawinan',
    component: InfoPerkawinan
  },
  {
    path: '/dataPerkawinan',
    name: 'DataPerkawinan',
    component: DataPerkawinan
  },
  {
    path: '/addPerkawinan',
    name: 'AddPerkawinan',
    component: AddPerkawinan
  },
  {
    path: '/dataPerceraian',
    name: 'DataPerceraian',
    component: DataPerceraian
  },
  {
    path: '/addPerceraian',
    name: 'AddPerceraian',
    component: AddPerceraian
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dataUser',
    name: 'DataUser',
    component: DataUser
  },
  {
    path: '/administrators',
    name: 'Administrators',
    component: Administrators,
  },
  {
    path: '/addAdmin',
    name: 'AddAdmin',
    component: AddAdmin,
  },
  {
    path: '/suratPerkawinan',
    name: 'SuratPerkawinan',
    component: SuratPerkawinan,
  },
  {
    path: '/suratPerceraian',
    name: 'SuratPerceraian',
    component: SuratPerceraian,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => { 
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters.authenticated && store.getters.user) {
      next()
      return
    }
    next()
  }

  if (to.matched.some(record => record.meta.guest)) {
    if (!store.getters.authenticated) {
      next()
      return
    }
    next()
  }

  next()
})


export default router
