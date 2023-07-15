import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
import Home from '@/home.vue'; // 引入你的主页组件
import Login from '@/login.vue'; // 引入你的登录页组件

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // meta: { requiresAuth: true }, // 这个路由需要认证
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // 检查路由元信息是否需要认证
  if (to.meta.requiresAuth && !userStore.token) {
    next({ name: 'Login' }); // 重定向到登录页面
  } else {
    next(); // 正常导航
  }
});

export default router;
