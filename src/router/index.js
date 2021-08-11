import Vue from 'vue'
import VueRouter from 'vue-router'

//import halaman
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import AddPerceraian from '../views/AddPerceraian.vue'
import AddPerkawinan from '../views/AddPerkawinan.vue'
import Register from '../views/Register.vue'
import DataUser from '../views/DataUser.vue'
import Administrators from '../views/Administrators.vue'
import AddAdmin from '../views/AddAdmin.vue'
import store from '../store/index.js'

import DataPerkawinanDetail from '../views/DataPerkawinanDetail.vue'
import DataPerkawinan from "../views/DataPerkawinan.vue";
import SuratPerkawinan from '../views/SuratPerkawinan.vue'

import DataPerceraian from "../views/DataPerceraian";
import DataPerceraianDetail from "../views/DataPerceraianDetail";
import SuratPerceraian from '../views/SuratPerceraian.vue'

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
    // PERCERAIAN
    {
        path: '/dataPerceraian',
        name: 'DataPerceraian',
        component: DataPerceraian,
        meta: {
            auth: true,
            role: ['admin', 'user']
        }
    },
    {
        path: '/perceraianDetail/:id',
        name: 'DataPerceraianDetail',
        component: DataPerceraianDetail,
        props: true,
        meta: {
            auth: true,
            role: ['admin', 'user']
        }
    },
    {
        path: '/suratPerceraian/:id',
        name: 'SuratPerceraian',
        component: SuratPerceraian,
        props: true
    },
    {
        path: '/addPerceraian',
        name: 'AddPerceraian',
        component: AddPerceraian,
        meta: {
            auth: true,
            role: ["user"]
        }
    },
    //PERKAWINAN
    {
        path: '/dataPerkawinan',
        name: 'DataPerkawinan',
        component: DataPerkawinan,
        meta: {
            auth: true,
            role: ["admin", "user"]
        }
    },
    {
        path: '/perkawinanDetail/:id',
        name: 'DataPerkawinanDetail',
        component: DataPerkawinanDetail,
        props: true,
        meta: {
            auth: true,
            role: ['admin', 'user']
        }
    },
    {
        path: '/suratPerkawinan/:id',
        name: 'SuratPerkawinan',
        component: SuratPerkawinan,
        props: true

    },
    {
        path: '/addPerkawinan',
        name: 'AddPerkawinan',
        component: AddPerkawinan,
        meta: {
            auth: true,
            role: ["user"]
        }
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
