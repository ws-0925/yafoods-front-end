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
export const fetchData = createAsyncThunk('appNotifications/fetchData', async () => {
  const response = await axios.get('/apps/notifications/list')

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

export const appNotificationsSlice = createSlice({
  name: 'appNotifications',
  initialState: {
    notifications: <any>[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.notifications = action.payload.notifications
    })
  }
})

export default appNotificationsSlice.reducer
