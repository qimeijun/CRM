import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './plugins/i18n.js'
import router from '@/plugins/router.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
