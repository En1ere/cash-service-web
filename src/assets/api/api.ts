import axios from 'axios'

// создаём инстанс
export const api = axios.create({
  baseURL: 'https://192.168.50.97:3000', // замени на свой API
  timeout: 10000,
  withCredentials: true, // если нужны куки
  headers: {
    // uuid: ,
    // sitenew: 1,
    // "Content-Language": ,
    // "X-Api-Key": ,
    // source: ,
},
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status

      if (status === 401) {
        console.log('Не авторизован')

        // пример: редирект на логин
        // window.location.href = '/login'  
      }

      if (status === 500) {
        console.log('Ошибка сервера')
      }
    }

    return Promise.reject(error)
  }
)