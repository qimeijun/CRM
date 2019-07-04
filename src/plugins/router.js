import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/', component: () => import('./../pages/index.vue') },
        { path: '/second', component: () => import('./../pages/second.vue') },
        { path: '/workbench', component: () => import('./../pages/workbench.vue') },
        { path: '/projectmanage', component: () => import('./../pages/projectManage.vue') },
        { path: '/membermanage', component: () => import('./../pages/memberManage.vue') },
        { path: '/tagmanage', component: () => import('./../pages/tagManage.vue') }

    ]
});