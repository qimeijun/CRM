import axios from 'axios'
import Vue from 'vue'
import Qs from 'qs'
import router from 'vue-router'
import Message from './message.js'
import store from './../store/index.js'

// 请求拦截器
axios.interceptors.request.use((config) => {
    config.url = `${process.env.VUE_APP_API_ROOT}${config.url}`;
    let userInfo = store.getters['ipublic/userInfo'];
    // jwt 验证
    if (userInfo.jwtValue) {
        config.headers[`${userInfo.jwtKey}`] = userInfo.jwtValue;
    }
    if (config.method == "post" && config.data) {
        // 获取所有的 value
        let values = Object.values(config.data);
        let hasArray = values.find(val => Object.prototype.toString.call(val) == '[object Array]');
        hasArray ? null : config.data = Qs.stringify(config.data);
    }
    return config;
}, (error) => {
    return Promise.resolve({
        iworkuCode: '201',
        datas: [],
        iworkuErrorMsg: ""
    });
});

// 响应拦截器
axios.interceptors.response.use((response) => {
    if (response.data.iworkuCode != '200') {
        if (response.data.iworkuCode == '403') {
            // 如果没有存储用户信息，那就让用户跳转到登录页面
            let username = getCookie('username');
            if (!username) {
                router.push({ path: '/login' });
            }
        } else {
            Message({
                content: response.data.iworkuErrorMsg,
                type: 'error'
            });
        }
    }
    return response.data;
}, (error) => {
    return Promise.resolve({
        iworkuCode: '201',
        datas: [],
        iworkuErrorMsg: ""
    });
});

// 获取浏览器cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
Vue.prototype.$http = axios;