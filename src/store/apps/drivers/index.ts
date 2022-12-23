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
export const fetchData = createAsyncThunk('appDrivers/fetchData', async () => {
  const response = await axios.get('/apps/drivers/categories/list')

  return response.data
})

export const getType = createAsyncThunk('appDrivers/getType', async () => {
  const response = await axios.get('/apps/drivers/type/list')

  return response.data
})

export const getDrivers = createAsyncThunk('appDrivers/getDrivers', async () => {
  const response = await axios.get('/apps/drivers/drivers/list')

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

export const appDriversSlice = createSlice({
  name: 'appDrivers',
  initialState: {
    categories: <any>[],
    types: <any>[],
    vehicles: <any>[],
    drivers: <any>[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.categories = action.payload.categories
    })
    builder.addCase(getType.fulfilled, (state, action) => {
      state.types = action.payload.types
    })
    builder.addCase(getDrivers.fulfilled, (state, action) => {
      state.drivers = action.payload.drivers
    })
  }
})

export default appDriversSlice.reducer
