import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import AppMain from '../layouts/app-main/index.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/category',
    component: AppMain,
    children: [
      {
        path: '',
        name: 'Category',
        component: () => import(/* webpackChunkName: 'category' */'../views/category/index.vue'),
      },
    ],
  },
  {
    path: '/product',
    component: AppMain,
    children: [
      {
        path: '',
        name: 'Product',
        component: () => import(/* webpackChunkName: 'product' */'../views/product/index.vue'),
      },
    ],
  },
  {
    path: '/upload',
    component: AppMain,
    children: [
      {
        path: '',
        name: 'Upload',
        component: () => import(/* webpackChunkName: 'upload' */'../views/upload/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: 'login' */'../views/login/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
