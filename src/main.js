import Vue from "vue";
import App from "@/App.vue";
import Vuesax from "vuesax"

import 'vuesax/dist/vuesax.css'; //Vuesax styles
import 'noty/lib/themes/mint.css'
import 'noty/lib/noty.css'
import 'material-icons/iconfont/material-icons.css';
import router from './router';
import store from './store';
import './assets/css/main.css';
import VueApexCharts from "vue-apexcharts";

Vue.use(
  Vuesax, 
  VueApexCharts,
  //option here
)
Vue.component('apexchart', VueApexCharts);

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
