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
import VueHtmlToPaper from 'vue-html-to-paper';

Vue.use(
  Vuesax, 
  VueApexCharts,
  //option here
)
Vue.component('apexchart', VueApexCharts);

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=no'
  ],
  styles: [
    "https://cdn.jsdelivr.net/npm/vuesax/dist/vuesax.css"
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}

Vue.use(VueHtmlToPaper, options);

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
