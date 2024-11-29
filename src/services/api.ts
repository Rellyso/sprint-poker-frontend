import axios from 'axios'
import { Cookies } from 'react-cookie'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const token = new Cookies().get('token')

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default api
