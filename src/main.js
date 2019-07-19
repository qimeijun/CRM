import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import '@/plugins/i18n.js'
import router from '@/plugins/router.js'
import store from  '@/store/index.js'
import './plugins/axios.js'
import './plugins/session.js'
import './plugins/global.js'
import '@/assets/style/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
