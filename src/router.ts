import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const constantRoutes: RouteConfig[] = [
    {
        path: '/',
        component: () => import('@/views/login/login.vue'),
    },
    // {
    //     path: '/',
    //     component: () => import('@/layout/index.vue'),
    // },
];

const createRouter = () => new VueRouter({
    routes: constantRoutes,
});

const router = createRouter();

export default router;
