import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import '@/assets/css/common.css'
import '@/assets/css/iconfont.css'
import LyTab from "ly-tab"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Vant from 'vant';
import 'vant/lib/index.css';


Vue.use(VueAwesomeSwiper)
Vue.use(LyTab);
Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
