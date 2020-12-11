import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Collections from '@/views/Collections.vue';
import * as authHelpers from '@/helpers/auth.helper';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/collections'
    },
    {
        path: '/collections',
        name: 'Collections',
        component: () => import(/* webpackChunkName: "collections" */ '../views/Collections.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/train',
        name: 'Train',
        component: () => import(/* webpackChunkName: "train" */ '../views/Train.vue')
    },
    {
        path: '/test',
        name: 'test',
        component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue')
    },
    {
        path: '/learn',
        name: 'learn',
        component: () => import(/* webpackChunkName: "learn" */ '../views/Learn.vue')
    },
    {
        path: '/import',
        name: 'Import',
        component: () => import(/* webpackChunkName: "import" */ '../views/Import.vue')
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
