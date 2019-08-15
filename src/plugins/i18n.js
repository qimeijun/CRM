import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import zh from './../locale/zh'
import en from './../locale/en'
import Element from 'element-ui'

Vue.use(VueI18n)
// 获取浏览器 localStorage 中的数据
let lang = window.localStorage.getItem('lang');
if (!lang) {
    lang = 'en';
}
Vue.config.lang = lang;
// Vue.locale('zh', Object.assign(zhLocale, zh))
// Vue.locale('en', Object.assign(enLocale, en))


const messages = {
    zh: Object.assign(zhLocale, zh),
    en: Object.assign(enLocale, en)
  }
  // Create VueI18n instance with options
  const i18n = new VueI18n({
    locale: lang, // set locale
    messages, // set locale messages
  })
  
Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
})

Vue.prototype.$lang = i18n.locale;

export default i18n;