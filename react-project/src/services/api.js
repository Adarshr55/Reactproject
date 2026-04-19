import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const API = axios.create({
    baseURL: BASE_URL
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('access')
    if (token) config.headers.Authorization = Bearer ${token}
    return config
})

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            const refresh = localStorage.getItem('refresh')
            if (refresh) {
                try {
                    const res = await axios.post(
                        ${BASE_URL}/auth/token/refresh/,
                        { refresh }
                    )
                    const newAccess = res.data.access
                    localStorage.setItem('access', newAccess)
                    originalRequest.headers.Authorization = Bearer ${newAccess}
                    return API(originalRequest)
                } catch {
                    localStorage.clear()
                    window.location.href = '/login'
                }
            } else {
                localStorage.clear()
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export default API
