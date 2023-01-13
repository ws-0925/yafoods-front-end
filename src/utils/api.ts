import api from 'axios'

// Create an instance of axios
api.interceptors.request.use(
  config => {
    const accessToken = window.localStorage.accessToken ?? 'Temp'

    if (!!accessToken && !!config.headers) {
      config.baseURL = 'https://stageapis.yaafoods.com'
      config.headers['Authorization'] = `Bearer ${accessToken}`
      config.headers['Content-Type'] = 'application/json'
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// const api = axios.create({
//   baseURL: 'https://stageapis.yaafoods.com',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer ' + window.localStorage.accessToken
//   }
// })

export default api
