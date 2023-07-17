import { defineStore } from 'pinia'

export const useRouter = defineStore({
  id: 'routers',
  state: () => ({
    serverRoutes: JSON.parse(localStorage.getItem('serverRoutes')) || [],
  }),
  actions: {
    setServerRoutes(routes) {
      this.serverRoutes = routes
      localStorage.setItem('serverRoutes', JSON.stringify(routes))
    },
  },
})
