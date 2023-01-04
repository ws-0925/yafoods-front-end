import api from './api'

// import axios from "axios"

// store our JWT in LS and set axios headers if we do have a token

const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token
    window.localStorage.setItem('accessToken', token)
  } else {
    delete api.defaults.headers.common['Authorization']
    window.localStorage.removeItem('accessToken')
  }
}

export default setAuthToken
