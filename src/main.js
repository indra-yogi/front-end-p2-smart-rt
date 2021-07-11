import Vue from "vue";
import Axios from "axios";
import App from "@/App.vue";
import Vuesax from "vuesax"

import 'vuesax/dist/vuesax.css'; //Vuesax styles
import 'material-icons/iconfont/material-icons.css';
import router from './router';
import store from './store';
import './assets/css/main.css'
import axios from "axios";
import VueApexCharts from "vue-apexcharts";

Vue.use(
  Vuesax, 
  VueApexCharts,
  //option here
)
Vue.component('apexchart', VueApexCharts);

Vue.config.productionTip = false
Vue.prototype.$http = Axios;

new Vue({
  router,
  store,
  created() {
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      const userData = JSON.parse(userInfo)
      this.$store.commit('setUserData', userData)
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  render: h => h(App)
}).$mount('#app')
