import Vue from "vue";
import Axios from "axios";
import App from "@/App.vue";
import Vuesax from "vuesax"

import 'vuesax/dist/vuesax.css'; //Vuesax styles
import 'material-icons/iconfont/material-icons.css';
import router from './router';
import store from './store';
import axios from "axios";
import './assets/css/main.css';
import VueApexCharts from "vue-apexcharts";

import { setHeaderToken } from './utils/auth';

Vue.use(
  Vuesax, 
  VueApexCharts,
  //option here
)
Vue.component('apexchart', VueApexCharts);

Vue.config.productionTip = false
Vue.prototype.$http = Axios;

axios.defaults.baseURL = 'http://localhost:8000/api/'

const token = localStorage.getItem('token');

if (token) { 
  setHeaderToken(token) 
} 

store.dispatch('get_user', token)
.then(() =>{
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}).catch((error) => {
  console.error(error);
})
