import axios from 'axios'

// Create an instance of axios

const api = axios.create({
  baseURL: 'https://stageapis.yaafoods.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
