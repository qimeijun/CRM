import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import i18n from '@/plugins/i18n.js'
import router from '@/plugins/router.js'
import store from  '@/store/index.js'
import './plugins/axios.js'
import './plugins/session.js'
import './plugins/global.js'
import '@/assets/style/iconfont.css'
import './plugins/message.js'

Vue.config.productionTip = false

// 注册全局组件
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
