import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8000/api'
})

// send token with every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('access')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// auto refresh when token expires
API.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            const refresh = localStorage.getItem('refresh')

            if (refresh) {
                try {
                    // get new access token
                    const res = await axios.post(
                        'http://localhost:8000/api/auth/token/refresh/',
                        { refresh }
                    )
                    const newAccess = res.data.access
                    localStorage.setItem('access', newAccess)

                    // retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${newAccess}`
                    return API(originalRequest)

                } catch {
                    // refresh also expired — force logout
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