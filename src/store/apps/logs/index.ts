// ** Redux Imports
// import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// interface Redux {
//   getState: any
//   dispatch: Dispatch<any>
// }

// ** Fetch Users
export const getUserLogs = createAsyncThunk('appLogs/getUserLogs', async () => {
  const response = await axios.get('/apps/logs/userLogs')

  return response.data
})

export const getAdminLogs = createAsyncThunk('appLogs/getAdminLogs', async () => {
  const response = await axios.get('/apps/logs/adminLogs')

  return response.data
})

export const getDeleteUserLogs = createAsyncThunk('appLogs/getDeleteUserLogs', async () => {
  const response = await axios.get('/apps/logs/deleteUserLogs')

  return response.data
})

// ** Add User
// export const addUser = createAsyncThunk(
//   'appUsers/addUser',
//   async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
//     const response = await axios.post('/apps/users/add-user', {
//       data
//     })
//     dispatch(fetchData(getState().user.params))

//     return response.data
//   }
// )

// ** Delete User
// export const deleteUser = createAsyncThunk(
//   'appUsers/deleteUser',
//   async (id: number | string, { getState, dispatch }: Redux) => {
//     const response = await axios.delete('/apps/users/delete', {
//       data: id
//     })
//     dispatch(fetchData(getState().user.params))

//     return response.data
//   }
// )

export const appLogsSlice = createSlice({
  name: 'appLogs',
  initialState: {
    users: <any>[],
    admins: <any>[],
    deletedUsers: <any>[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserLogs.fulfilled, (state, action) => {
      state.users = action.payload.users
    })
    builder.addCase(getAdminLogs.fulfilled, (state, action) => {
      state.admins = action.payload.admins
    })
    builder.addCase(getDeleteUserLogs.fulfilled, (state, action) => {
      state.deletedUsers = action.payload.deletedUsers
    })
  }
})

export default appLogsSlice.reducer
