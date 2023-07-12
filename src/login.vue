<template>
  <div>
    <input v-model="loginForm.username" placeholder="Username" />
    <input v-model="loginForm.password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <!-- 错误消息显示 -->
    <p v-if="userStore.error">{{ userStore.error }}</p>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useUserStore } from './stores/user';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const loginForm = reactive({ username: '', password: '' });

    const login = async () => {
      try {
        const response = await axios.post('/api/auth/login', loginForm);

        userStore.setToken(response.data.token);
        userStore.setName(loginForm.username);
        // 登录成功，重定向到主页
        router.push({ name: 'Home' });
      } catch (error) {
        console.error('Failed to login', error);
        userStore.setError('Failed to login');
      }
    };

    return {
      loginForm,
      login,
      userStore,
    };
  },
};
</script>

