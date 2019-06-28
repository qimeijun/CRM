import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
 mode: 'history',
 base: __dirname,
 routes: [
     { path: '/', component: () => import('./../pages/index.vue') },
     { path: '/second', component: () => import('./../pages/second.vue') }
 ]
});