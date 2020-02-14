import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Layout from '@/layout/index.vue';

Vue.use(VueRouter);

export const constantRoutes: RouteConfig[] = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
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
                    title: 'Dashboard',
                    icon: 'dashboard',
                },
            },
        ],
    },
];

export const asyncRoutes: RouteConfig[] = [];

function createRouter() {
    return new VueRouter({
        routes: constantRoutes,
    });
}

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
