import axios from 'axios'

// Create an instance of axios
const api = axios.create({
  baseURL: 'https://stageapis.yaafoods.com',
  headers: {
    'Content-Type': 'multipart/form-data'

    // 'authorization': currentState.auth.token == '' ? localStorage.getItem('token') : currentState.auth.token
  }
})

export default api
