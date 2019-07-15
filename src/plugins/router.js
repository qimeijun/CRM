import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/index', component: () => import('./../pages/index.vue') },
        { path: '/workbench', component: () => import('./../pages/workbench.vue') },
        { path: '/projectmanage', component: () => import('./../pages/projectManage.vue') },
        { path: '/membermanage', component: () => import('./../pages/memberManage.vue') },
        { path: '/tagmanage', component: () => import('./../pages/tagManage.vue') },
        { path: '/member', component: () => import('./../pages/members.vue') },
        {
            path: '/member/detail', component: () => import('./../pages/membersDetail.vue'),
            children: [
                {
                    path: '/',
                    alias: "info",
                    component: () => import('./../components/member/Information.vue')
                },
                {
                    path: 'project',
                    component: () => import('./../components/member/Project.vue')
                },
                {
                    path: 'team',
                    component: () => import('./../components/team/Team.vue')
                },
                {
                    path: 'diary',
                    component: () => import('./../components/member/WorkDiary.vue')
                },
                {
                    path: 'private',
                    component: () => import('./../components/member/Private.vue')
                }
            ]
        },
        {
            path: '/project/detail', component: () => import('./../pages/projectDetail.vue'),
            children: [
                {
                    path: '/',
                    alias: "info",
                    name: "information",
                    component: () => import('./../components/project/Information.vue')
                },
                {
                    path: 'product',
                    name: "product",
                    component: () => import('./../components/project/Product.vue')
                },
                {
                    path: 'commonality',
                    name: 'commonality',
                    component: () => import('./../components/project/Commonality.vue')
                },
                {
                    path: 'private',
                    name: 'private',
                    component: () => import('./../components/project/Private.vue')
                },
                {
                    path: 'diary',
                    name: 'diary',
                    component: () => import('./../components/project/Diary.vue')
                },
            ]
        },
        {
            path: '/target/detail', component: () => import('./../pages/targetDetail.vue'),
            children:[
                {
                    path: '/',
                    alias: "info",
                    name: "target_information",
                    component: () => import('./../components/target/Information.vue')
                },
                {
                    path: 'probe',
                    name: 'target_probe',
                    component: () => import('./../components/target/Probe.vue')
                },
                {
                    path: 'diary',
                    name: 'target_diary',
                    component: () => import('./../components/target/Diary.vue')
                },
            ]
        }


    ]
});