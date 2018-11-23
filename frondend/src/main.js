import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import store from './utils/Store.js'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.prototype.$myStore = store

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
