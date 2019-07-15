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
                    name: 'member-info',
                    component: () => import('./../components/member/Information.vue')
                },
                {
                    path: 'project',
                    name: 'member-project',
                    component: () => import('./../components/member/Project.vue')
                },
                {
                    path: 'team',
                    name: 'member-team',
                    component: () => import('./../components/team/Team.vue')
                },
                {
                    path: 'diary',
                    name: 'member-diary',
                    component: () => import('./../components/work/WorkDiary.vue')
                },
                {
                    path: 'private',
                    name: 'member-private',
                    component: () => import('./../components/member/Private.vue')
                }
            ]
        }

    ]
});