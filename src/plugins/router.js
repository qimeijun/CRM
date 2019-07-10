import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/index', component: () => import('./../pages/index.vue') },
        { path: '/second', component: () => import('./../pages/second.vue') },
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
                    component: () => import('./../components/member/Team.vue')
                },
                {
                    path: 'diary',
                    component: () => import('./../components/member/WorkDiary.vue')
                }
            ]
        }

    ]
});