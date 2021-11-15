import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Recent from '../views/Recent.vue';
import HistoryBalance from '../views/HistoryBalance.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/recent',
    name: 'Recent',
    component: Recent,
  },
  {
    path: '/history',
    name: 'History',
    component: HistoryBalance,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
