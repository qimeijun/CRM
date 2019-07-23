import axios from 'axios'
import Vue from 'vue'
import Qs from 'qs'
// 请求拦截器
axios.interceptors.request.use((config) => {
    config.url = `${process.env.VUE_APP_API_ROOT}${config.url}`;
    config.headers[`Authorization`] = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJtYXAiOnsicGFzc3dvcmQiOiJlMTBhZGMzOTQ5YmE1OWFiYmU1NmUwNTdmMjBmODgzZSIsInJvbGUiOiIyIiwibmFtZSI6IuW8oOW_l-elpSIsImlkIjoiMTJiYWJhODItMWFlYi0xMWU5LWE3ZDgtNTI1NGRmODU0MzdkIiwiYWNjb3VudCI6IjMzNTkwMjIzNyJ9LCJzdWIiOiLlvKDlv5fnpaUiLCJleHAiOjE1NjQwMTgwMjh9.nP45lQqPutMO19Xu9cpk3pJFpf9Ia5hzMSI0IZcJO-OjRZnqFdFVZhfadYoIJ11VNYX480ztsvUFfTm6oaBr_A";
return config;
}, (error) => {
    console.log(error);
});

// 响应拦截器
axios.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    console.log(error);
});

Vue.prototype.$http = axios;


// 添加新项目
export const addNewProject = params => { return axios.post(`/customer/company/save`,Qs.stringify(params)).then(res => res ); }; 

// 分页获取项目
export const getProjectListApi = params => { return axios.post(`/customer/item/withpaginglist`,Qs.stringify(params)).then(res => res ); }; 

// 修改项目状态
export const updateProjectTypeApi = params => { return axios.post(`/customer/item/update/status`,Qs.stringify(params)).then(res => res ); }; 

// 获取项目公司资料
export const getCompanyInfoApi = params => { return axios.get(`/customer/item/infobypk/${params}`).then(res => res ); }; 

// 修改项目公司资料
export const updateCompanyInfoApi = params => { return axios.post(`/customer/company/update`,Qs.stringify(params)).then(res => res ); }; 

// 用产品ID查询产品
export const getCompanyProductApi = params => { return axios.get(`/customer/company/product/infobypk/${params}`).then(res => res ); };

// 用项目ID查询产品
export const getProductItemidApi = params => { return axios.post(`/customer/company/product/item/withoutpaginglist`,Qs.stringify(params)).then(res => res ); }; 

// 获取标签分组
export const getTagGroupApi = params => { return axios.post(`/customer/item/label/group/withoutpaginglist`,Qs.stringify(params)).then(res => res ); }; 

// 不分页获取标签
export const getTagApi = params => { return axios.post(`/customer/item/label/withoutpaginglist`,Qs.stringify(params)).then(res => res ); }; 

// 根据项目ID不分页查询标签
export const getProjectTagApi = params => { return axios.post(`/customer/item/label/rel/withoutpaginglist`,Qs.stringify(params)).then(res => res ); }; 

// 根据项目ID查询项目成员
export const getProjectUserApi = params => { return axios.post(`/user/item/user/rel/withoutpaginglist`,Qs.stringify(params)).then(res => res ); }; 


