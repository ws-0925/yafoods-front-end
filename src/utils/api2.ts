import axios from 'axios'

// Create an instance of axios
const customAxios = axios.create()
customAxios.interceptors.request.use(
  config => {
    const accessToken = window.localStorage.accessToken ?? 'Temp'

    if (!!accessToken && !!config.headers) {
      config.baseURL = 'https://stageapis.yaafoods.com'
      config.headers['Authorization'] = `Bearer ${accessToken}`
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

export default customAxios
