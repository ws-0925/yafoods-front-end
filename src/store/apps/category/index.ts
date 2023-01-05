// ** Redux Imports
// import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
// import axios from 'axios'
import api2 from 'src/utils/api2'
import api from 'src/utils/api'

// interface Redux {
//   getState: any
//   dispatch: Dispatch<any>
// }

// ** Fetch Users
export const getCategories = createAsyncThunk('appCategories/getCategories', async () => {
  const response = await api.get('/api/backend/categories', {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const addCategory = createAsyncThunk('appCategories/addCategory', async (formData: any) => {
  const response = await api2.post('/api/backend/category', formData)

  return response.data
})

export const appCategoriesSlice = createSlice({
  name: 'appCategories',
  initialState: {
    categories: <any>[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data
    })
  }
})

export default appCategoriesSlice.reducer
