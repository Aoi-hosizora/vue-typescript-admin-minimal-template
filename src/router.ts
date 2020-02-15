import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Layout from '@/layout/index.vue';

Vue.use(VueRouter);

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes: RouteConfig[] = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: { hidden: true },
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404.vue'),
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

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes: RouteConfig[] = [
    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: 'Nested',
            icon: 'nested',
        },
        children: [
            {
                path: 'menu1',
                component: () => import('@/views/nested/menu1/index.vue'), // Parent router-view
                name: 'Menu1',
                meta: { title: 'Menu1' },
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
                        name: 'Menu1-1',
                        meta: { title: 'Menu1-1' },
                    },
                    {
                        path: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
                        name: 'Menu1-2',
                        meta: { title: 'Menu1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                                name: 'Menu1-2-1',
                                meta: { title: 'Menu1-2-1' },
                            },
                            {
                                path: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                                name: 'Menu1-2-2',
                                meta: { title: 'Menu1-2-2' },
                            },
                        ],
                    },
                    {
                        path: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
                        name: 'Menu1-3',
                        meta: { title: 'Menu1-3' },
                    },
                ],
            },
            {
                path: 'menu2',
                component: () => import('@/views/nested/menu2/index.vue'),
                meta: { title: 'menu2' },
            },
        ],
    },
    {
        path: 'external-link',
        component: Layout,
        children: [
            {
                path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
                meta: { title: 'vue-element-admin Homepage', icon: 'link' },
            },
            {
                path: 'https://github.com/Aoi-hosizora/vue-typescript-admin-min-template',
                meta: { title: 'Project Page', icon: 'link' },
            },
        ],
    },
    // 404 page must be placed at the end
    {
        path: '*',
        redirect: '/404',
        meta: { hidden: true },
    },
];

function createRouter() {
    return new VueRouter({
        mode: 'history', // require service support
        scrollBehavior: (to, from, savedPosition) => {
            if (savedPosition) {
                return savedPosition;
            } else {
                return { x: 0, y: 0 };
            }
        },
        routes: constantRoutes,
    });
}

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
