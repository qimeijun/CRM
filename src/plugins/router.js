import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../store/index.js'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/', component: () => import('./../pages/layout.vue') ,
            children: [
                { path: '/', component: () => import('./../pages/workbench.vue') },
                { path: '/projectmanage/:id?', component: () => import('./../pages/projectManage.vue') },
                {
                    path: '/tag', component: () => import('./../pages/tag.vue'),
                    children: [
                        {
                            path: 'project/:id?',
                            name: 'tag-project',
                            component: () => import('./../components/tag/Project.vue')
                        },
                        {
                            path: 'target/:id?',
                            name: 'tag-target',
                            component: () => import('./../components/tag/Target.vue')
                        }
                    ]
                },
                { path: '/member/:id?', component: () => import('./../pages/members.vue') },
                {
                    path: '/member/detail', component: () => import('./../pages/membersDetail.vue'),
                    children: [
                        {
                            path: 'info/:id',
                            alias: "info",
                            name: 'member-info',
                            component: () => import('./../components/member/Information.vue')
                        },
                        {
                            path: 'project/:id',
                            name: 'member-project',
                            component: () => import('./../components/member/Project.vue')
                        },
                        {
                            path: 'team/:id',
                            name: 'member-team',
                            component: () => import('./../components/team/Team.vue')
                        },
                        {
                            path: 'diary/:id',
                            name: 'member-diary',
                            component: () => import('./../components/member/WorkDiary.vue')
                        },
                        {
                            path: 'private/:id',
                            name: 'member-private',
                            component: () => import('./../components/member/Private.vue')
                        }
                    ]
                },
                {
                    path: '/project/detail', component: () => import('./../pages/projectDetail.vue'),
                    children: [
                        {
                            path: 'info/:itemid/:adminId',
                            alias: "info",
                            name: "information",
                            component: () => import('./../components/project/Information.vue')
                        },
                        {
                            path: 'product/:itemid/:adminId',
                            name: "product",
                            component: () => import('./../components/project/Product.vue')
                        },
                        {
                            path: 'commonality/:itemid/:adminId',
                            name: 'commonality',
                            component: () => import('./../components/project/Commonality.vue')
                        },
                        {
                            path: 'private/:itemid/:adminId',
                            name: 'private',
                            component: () => import('./../components/project/Private.vue')
                        },
                        {
                            path: 'diary/:itemid/:adminId',
                            name: 'diary',
                            component: () => import('./../components/project/WorkDiary.vue')
                        },
                    ]
                },
                {
                    path: '/target/detail', component: () => import('./../pages/targetDetail.vue'),
                    children:[
                        {
                            path: 'info/:targetid/:itemid',
                            alias: "info",
                            name: "target_information",
                            component: () => import('./../components/target/Information.vue')
                        },
                        {
                            path: 'probe/:targetid/:itemid',
                            name: 'target_probe',
                            component: () => import('./../components/target/Probe.vue')
                        },
                        {
                            path: 'quotation/:targetid/:itemid',
                            name: 'target_quotation',
                            component: () => import('./../components/target/Quotation.vue')
                        },
                        {
                            path: 'diary/:targetid/:itemid',
                            name: 'target_diary',
                            component: () => import('./../components/target/WorkDiary.vue')
                        }
                    ]
                },
                {
                    path: '/setting',
                    name: 'setting',
                    component: () => import('./../pages/setting.vue')
                },
                {
                    path: '/highseas/:id?',
                    name: 'highseas',
                    component: () => import('./../pages/highseas.vue')
                },
                {
                    path: '/highseas/loca/:targetName',
                    name:"highseasLoca",
                    component: () => import('./../pages/highseasLoca.vue')
                },
                {
                    path: '/notice',
                    name: 'notice',
                    component: () => import('./../pages/notice.vue')
                },
                {
                    path:"/customer",component: () => import('./../pages/Customer.vue'),
                    children: [
                        {
                            path: 'info/:itemid/:adminId',
                            name: "customer_information",
                            component: () => import('./../components/project/Information.vue')
                        },
                        {
                            path: 'product/:itemid/:adminId',
                            name: "customer_product",
                            component: () => import('./../components/project/Product.vue')
                        },
                        {
                            path: 'target/:itemid/:adminId',
                            name: "customer_target",
                            component: () => import('./../components/project/CustomerTargetTable.vue')
                        },
                        {
                            path: 'diary/:itemid/:adminId',
                            name: 'customer_diary',
                            component: () => import('./../components/project/WorkDiary.vue')
                        },
                    ]

                }
            ]
        }, {
            path: '/login',
            name: 'login',
            component: () => import('./../pages/login.vue')
        },
        {
            path: '*',
            name: '4-0-4',
            component: () => import('./../pages/404.vue')
        }
    ]
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
    let userInfo = store.getters['ipublic/userInfo'];
    if (userInfo && userInfo.jwtValue && userInfo.id) {
        document.title = `${userInfo.userAccount}-${userInfo.roleName}`
    }
    if (to.name == 'login') {
        (userInfo && userInfo.jwtValue && userInfo.id) ? next({path: '/'}) : next(); 
    } else { 
        !userInfo.id ? next({ path: '/login' }) : next();
    }
});
export default router;