import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Layout from '@/layout/index.vue';

Vue.use(VueRouter);

const constantRoutes: RouteConfig[] = [
    {
        path: '/redirect',
        component: Layout,
        meta: { hidden: true },
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect/redirect.vue'),
            },
        ],
    },
    {
        path: '/login',
        component: () => import('@/views/login/login.vue'),
        meta: { hidden: true },
    },
    {
        path: '/auth-redirect',
        component: () => import('@/views/redirect/auth-redirect.vue'),
        meta: { hidden: true },
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                name: 'Dashboard',
                meta: {
                    title: 'dashboard',
                    icon: 'dashboard',
                    affix: true,
                },
            },
        ],
    },
];

const createRouter = () => new VueRouter({
    routes: constantRoutes,
});

const router = createRouter();

export default router;
