import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import AppMain from '../layouts/app-main.vue';

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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
