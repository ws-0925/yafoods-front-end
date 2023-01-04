// ** Redux Imports
// import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import api from 'src/utils/api'

// ** Fetch Users
export const login = createAsyncThunk('auth/login', async (userData: any) => {
  const response = await api.post('/api/backend/login', userData)
  console.log('request === ', response.data)

  return response.data
})

interface IState {
  token: string
  isAuthenticated: boolean
  loading: boolean
  user:
    | undefined
    | {
        id: string
        name: string
        email: string
        mobile_no: string
        role_id: string
      }
}

const initialState: IState = {
  token: '',
  isAuthenticated: false,
  loading: false,
  user: undefined
}

// export const loadUser = createAsyncThunk('auth/success', async() => {
//     const response = await api.get()
// })

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.loading = false
      state.user = action.payload.user
      state.token = action.payload.token

      // localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('accessToken', action.payload.token)
    })
  }
})

export default authSlice.reducer
