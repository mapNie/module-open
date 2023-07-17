import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useRouter } from "@/stores/routers";
import Home from '@/home.vue'; // 引入你的主页组件
import Login from '@/login.vue';
import axios from "axios"; // 引入你的登录页组件

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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 用于转换并添加路由的函数
function addRoute(route) {
  const newRoute = {
    path: route.path,
    name: route.name,
    component: () => import(`./views/${route.component}.vue`),
    children: []
  }

  // 如果存在子路由，递归添加
  if (route.children && route.children.length) {
    route.children.map(childRoute => {
      newRoute.children.push(addRoute(childRoute))
    })
  }
  router.addRoute(newRoute)
  return newRoute
}

// 创建 Pinia store 的实例
const store = useRouter

// 从服务器获取路由数据
axios.get('/api/routes')
  .then(response => {
    const serverRoutes = response.data
    // 存储到 Pinia store
    store.setServerRoutes(serverRoutes)
    // 添加到路由器
    serverRoutes.map(route => addRoute(route))
  })

// 全局前置守卫，在路由进入之前
router.beforeEach((to, from, next) => {
  // 执行相关逻辑...
  const userStore = useUserStore();

  // 检查路由元信息是否需要认证
  if (to.meta.requiresAuth && !userStore.token) {
    next({ name: 'Login' }); // 重定向到登录页面
  } else {
    next(); // 正常导航
  }
  console.log('全局前置守卫 - 进入页面')
  next()  // 确保执行next()函数以进入下一个钩子
})

// 全局后置钩子，在路由进入之后
router.afterEach((to, from) => {
  // 执行相关逻辑...
  console.log('全局后置钩子 - 离开页面')
})

export default router
