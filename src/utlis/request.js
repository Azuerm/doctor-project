import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '',
  timeout: 10000,
})
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { code, msg } = response.data
    if (code !== 200) {
      alert(msg || '请求失败')
      return Promise.reject(new Error(msg))
    }
    return response
  },
  (error) => {
    alert(error.message || '网络错误')
    return Promise.reject(error)
  },
)

export default request