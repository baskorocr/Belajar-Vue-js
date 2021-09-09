import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'transaction.index',
    component: () => import('../view/transaction/index.vue'),
  },
  {
    path: '/create',
    name: 'transaction.create',
    component: () => import('../view/transaction/create.vue'),
  },
  {
    path: '/edit/:id',
    name: 'transaction.edit',
    component: () => import('../view/transaction/edit.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
