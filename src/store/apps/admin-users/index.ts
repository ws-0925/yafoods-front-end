// ** Redux Imports
// import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
// import axios from 'axios'
import api from 'src/utils/api'

// ** Fetch Users
export const getAdmins = createAsyncThunk('appAminUsers/getAdmins', async () => {
  const response = await api.get('/api/backend/admins')

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
