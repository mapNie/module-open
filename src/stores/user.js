import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        name: '',
        token: '',
        error: '',
    }),
    actions: {
        setName(name) {
            this.name = name;
        },
        setToken(token) {
            this.token = token;
            localStorage.setItem('user-token', token);
        },
        setError(error) {
            this.error = error;
        },
        clearToken() {
            this.token = '';
            localStorage.removeItem('user-token');
        },
    },
});
