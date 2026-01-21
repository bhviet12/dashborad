import axios from 'axios'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosClient.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err)
)

export default axiosClient
