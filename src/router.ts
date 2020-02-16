import Vue from 'vue';
import VueRouter, { RouteConfig, RouteRecord } from 'vue-router';

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
        name: 'Dashboard',
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
 * Only export dashboard used in breadCrumb
 */
export const dashBoardRoute = { path: '/dashboard', meta: { title: 'Dashboard' } } as RouteRecord;

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes: RouteConfig[] = [
    {
        path: '/perm-admin',
        name: 'perm-admin',
        component: Layout,
        meta: {
            roles: ['admin'],
        },
        children: [
            {
                path: '',
                component: () => import('@/views/perm-demo/admin/index.vue'),
                meta: {
                    title: 'Admin used',
                    icon: 'user',
                },
            },
        ],
    },
    {
        path: '/perm-editor',
        name: 'perm-editor',
        component: Layout,
        meta: {
            roles: ['editor'],
        },
        children: [
            {
                path: '',
                component: () => import('@/views/perm-demo/editor/index.vue'),
                meta: {
                    title: 'Editor used',
                    icon: 'user',
                },
            },
        ],
    },
    {
        path: '/example',
        name: 'example',
        component: Layout,
        redirect: '/example/table/static',
        meta: {
            title: 'Example',
            icon: 'example',
        },
        children: [
            {
                path: 'table',
                name: 'table',
                component: () => import('@/views/table/index.vue'),
                redirect: '/example/table/static',
                meta: {
                    title: 'Table',
                    icon: 'table',
                },
                children: [
                    {
                        path: 'static',
                        name: 'table-static',
                        component: () => import('@/views/table/static-table/index.vue'),
                        meta: { title: 'Static Table' },
                    },
                    {
                        path: 'editable',
                        name: 'table-editable',
                        component: () => import('@/views/table/inline-edit-table/index.vue'),
                        meta: { title: 'Editable Table' },
                    },
                ],
            },
            {
                path: 'tree',
                name: 'tree',
                component: () => import('@/views/tree/index.vue'),
                meta: {
                    title: 'Tree',
                    icon: 'tree',
                },
            },
            {
                path: 'form',
                name: 'form',
                component: () => import('@/views/form/index.vue'),
                meta: {
                    title: 'Form',
                    icon: 'form',
                },
            },
        ],
    },
    {
        path: '/nested',
        name: 'nested',
        component: Layout,
        redirect: '/nested/menu1/menu1-1',
        meta: {
            title: 'Nested',
            icon: 'nested',
        },
        children: [
            {
                path: 'menu1',
                name: 'nested-menu1',
                component: () => import('@/views/nested/menu1/index.vue'), // Parent router-view
                redirect: '/nested/menu1/menu1-1',
                meta: { title: 'Menu1' },
                children: [
                    {
                        path: 'menu1-1',
                        name: 'nested-menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
                        meta: { title: 'Menu1-1' },
                    },
                    {
                        path: 'menu1-2',
                        name: 'nested-menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
                        redirect: '/nested/menu1/menu1-2/menu1-2-1',
                        meta: { title: 'Menu1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                name: 'nested-menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                                meta: { title: 'Menu1-2-1' },
                            },
                            {
                                path: 'menu1-2-2',
                                name: 'nested-menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                                meta: { title: 'Menu1-2-2' },
                            },
                        ],
                    },
                    {
                        path: 'menu1-3',
                        name: 'nested-menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
                        meta: { title: 'Menu1-3' },
                    },
                ],
            },
            {
                path: 'menu2',
                name: 'nested-menu2',
                component: () => import('@/views/nested/menu2/index.vue'),
                meta: { title: 'menu2' },
            },
        ],
    },
    {
        path: '/external-link',
        component: Layout,
        meta: {
            title: 'External link',
            icon: 'link',
        },
        children: [
            {
                path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
                meta: { title: 'Homepage', icon: 'link' },
            },
            {
                path: 'https://github.com/Aoi-hosizora/vue-typescript-admin-min-template',
                meta: { title: 'Project code', icon: 'link' },
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
