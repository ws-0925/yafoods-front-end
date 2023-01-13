import api from 'axios'

// Create an instance of axios
api.interceptors.request.use(
  config => {
    const accessToken = window.localStorage.accessToken ?? 'Temp'

    if (!!accessToken && !!config.headers) {
      config.baseURL = 'https://stageapis.yaafoods.com'
      config.headers['Authorization'] = `Bearer ${accessToken}`
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// import axios from 'axios'

// // Create an instance of axios
// const api = axios.create({
//   baseURL: 'https://stageapis.yaafoods.com',
//   headers: {
//     'Content-Type': 'multipart/form-data'

//     // 'authorization': currentState.auth.token == '' ? localStorage.getItem('token') : currentState.auth.token
//   }
// })

export default api
