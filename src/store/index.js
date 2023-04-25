import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import user from './module/user.js'
import cart from './module/cart.js'
import order from './module/order.js'

export default new Vuex.Store({
  modules: {
    user,
    cart,
    order
  }
})
