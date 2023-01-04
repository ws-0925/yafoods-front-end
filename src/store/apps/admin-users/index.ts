// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
// import axios from 'axios'
import api from 'src/utils/api'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users
export const getAdmins = createAsyncThunk('appAminUsers/getAdmins', async () => {
  const response = await api.get('/api/backend/admins')

  return response.data
})

export const addAdmin = createAsyncThunk('appAminUsers/addAdmin', async (userData: any, { dispatch }: Redux) => {
  const response = await api.post('/api/backend/admin', userData)
  dispatch(getAdmins())

  return response.data
})

export const appUsersSlice = createSlice({
  name: 'appAdminUsers',
  initialState: {
    users: <any>[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAdmins.fulfilled, (state, action) => {
      state.users = action.payload.data
    })
  }
})

export default appUsersSlice.reducer
