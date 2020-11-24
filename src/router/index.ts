import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import * as authHelpers from '@/helpers/auth.helper';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/collections',
        name: 'Collections',
        component: () => import(/* webpackChunkName: "about" */ '../views/Collections.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((transition) => {
    if (transition.path !== '/login' && !authHelpers.getToken()) {
        router.push('/login')
    }
})

export default router;
