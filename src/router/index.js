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
import ValidasiPerkawinan from '../views/ValidasiPerkawinan.vue'
import ValidasiPerceraian from '../views/ValidasiPerceraian.vue'
import ValidasiDataPerkawinan from '../views/ValidasiDataPerkawinan.vue'
import ValidasiDataPerceraian from '../views/ValidasiDataPerceraian.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      auth: false
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      auth: false
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
    meta: {
      auth: true,
      role: ["superadmin"]
    }
  },
  {
    path: '/addAdmin',
    name: 'AddAdmin',
    component: AddAdmin,
    meta: {
      auth: true,
      role: ["superadmin"]
    }
  },
  {
    path: '/suratPerkawinan/:id',
    name: 'SuratPerkawinan',
    component: SuratPerkawinan,
    props: true
    
  },
  {
    path: '/suratPerceraian/:id',
    name: 'SuratPerceraian',
    component: SuratPerceraian,
    props: true
  },
  {
    path: '/validasiPerkawinan',
    name: 'ValidasiPerkawinan',
    component: ValidasiPerkawinan,
  },
  {
    path: '/validasiPerceraian',
    name: 'ValidasiPerceraian',
    component: ValidasiPerceraian
  },
  {
    path: '/validasiDataPerceraian/:id',
    name: 'ValidasiDataPerceraian',
    component: ValidasiDataPerceraian,
    props: true,
  },
  {
    path: '/validasiDataPerkawinan/:id',
    name: 'ValidasiDataPerkawinan',
    component: ValidasiDataPerkawinan,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (store.getters.auth.authenticated) {
      if (to.meta.role.includes(store.getters.auth.user.role.name)) {
        next()
        return
      }
    }
    next('/')
    return
  }
  next()
  return
})


export default router
