import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/', component: () => import('./../pages/layout.vue') ,
            children: [
                { path: '/', component: () => import('./../pages/workbench.vue') },
                { path: '/projectmanage', component: () => import('./../pages/projectManage.vue') },
                { path: '/membermanage', component: () => import('./../pages/memberManage.vue') },
                {
                    path: '/tag', component: () => import('./../pages/tag.vue'),
                    children: [
                        {
                            path: '/',
                            alias: 'project',
                            name: 'tag-project',
                            component: () => import('./../components/tag/Project.vue')
                        },
                        {
                            path: 'target',
                            name: 'tag-target',
                            component: () => import('./../components/tag/Target.vue')
                        }
                    ]
                },
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
                            component: () => import('./../components/work/WorkDiary.vue')
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
                            component: () => import('./../components/work/WorkDiary.vue')
                        },
                    ]
                },
                {
                    path: '/setting',
                    name: 'setting',
                    component: () => import('./../pages/setting.vue')
                }
            ]
        }
    ]
});