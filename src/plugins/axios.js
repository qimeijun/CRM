import axios from 'axios'
import Vue from 'vue'
import Qs from 'qs'
import Message from './message.js'
// 请求拦截器
axios.interceptors.request.use((config) => {
    config.url = `${process.env.VUE_APP_API_ROOT}${config.url}`;
    config.headers[`Authorization`] = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJtYXAiOnsicGFzc3dvcmQiOiJlMTBhZGMzOTQ5YmE1OWFiYmU1NmUwNTdmMjBmODgzZSIsInJvbGUiOiIyIiwibmFtZSI6IuW8oOW_l-elpSIsImlkIjoiMTJiYWJhODItMWFlYi0xMWU5LWE3ZDgtNTI1NGRmODU0MzdkIiwiYWNjb3VudCI6IjMzNTkwMjIzNyJ9LCJzdWIiOiLlvKDlv5fnpaUiLCJleHAiOjE1NjQwMTgwMjh9.nP45lQqPutMO19Xu9cpk3pJFpf9Ia5hzMSI0IZcJO-OjRZnqFdFVZhfadYoIJ11VNYX480ztsvUFfTm6oaBr_A";
    if (config.method == "post") {
        config.data = Qs.stringify(config.data);
    }
return config;
}, (error) => {
    console.log(error);
});

// 响应拦截器
axios.interceptors.response.use((response) => {
    if (response.data.iworkuCode != '200') {
        Message({
            content: response.data.iworkuErrorMsg,
            type: 'error'
        });
    }
    return response.data;
}, (error) => {
    return Promise.resolve({
        iworkuCode: '201',
        datas: []
    });
});

Vue.prototype.$http = axios;