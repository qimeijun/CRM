import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import zh from './../locale/zh'
import en from './../locale/en'

Vue.use(VueI18n)
// 获取浏览器 localStorage 中的数据
let lang = window.localStorage.getItem('lang');
if (!lang) {
    lang = 'en';
}
Vue.config.lang = lang;
Vue.locale('zh', Object.assign(zhLocale, zh))
Vue.locale('en', Object.assign(enLocale, en))