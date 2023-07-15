import { reactive } from 'vue'
import axios from 'axios'

const request = axios.create({
    baseURL: 'http://your-base-url.com',
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
        // 在这里可以做一些请求前的操作
        // 比如，如果有 token ，可以在这里设置
        // config.headers['Authorization'] = 'Bearer ' + token;
        return config
    },
    error => {
        // 请求错误处理
        console.error(error) // for debug
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(response => {
        // 在这里可以对响应的数据进行处理
        return response.data
    },
    error => {
        // 响应错误处理
        console.error('err' + error) // for debug
        return Promise.reject(error)
    }
)

export function useHttp() {
    const state = reactive({
        data: null,
        loading: true,
        error: null
    })

    const request = async (options) => {
        state.loading = true
        try {
            const response = await request(options)
            state.data = response
            state.error = null
        } catch (e) {
            state.data = null
            state.error = e
        } finally {
            state.loading = false
        }
    }

    return { ...state, request }
}
