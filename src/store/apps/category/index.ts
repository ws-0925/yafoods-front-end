// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
// import axios from 'axios'
import api2 from 'src/utils/api2'
import api from 'src/utils/api'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users
export const getCategories = createAsyncThunk('appCategories/getCategories', async () => {
  const response = await api.get('/api/backend/categories', {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const getParentCategories = createAsyncThunk('appCategories/getParentCategories', async () => {
  const response = await api.get('/api/backend/category/list', {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const addCategory = createAsyncThunk('appCategories/addCategory', async (formData: any, { dispatch }: Redux) => {
  const response = await api2.post('/api/backend/category', formData)
  dispatch(getCategories())

  return response.data
})

export const editCategory = createAsyncThunk('appCategories/editCategory', async (data: any) => {
  const response = await api2.put(`/api/backend/category/${data.id}`, data.formData)

  return response.data
})

export const deleteCategory = createAsyncThunk(
  'appCategories/deleteCategory',
  async (id: number, { dispatch }: Redux) => {
    const response = await api.delete(`/api/backend/category/${id}`)
    dispatch(getCategories())

    return response.data
  }
)

export const appCategoriesSlice = createSlice({
  name: 'appCategories',
  initialState: {
    categories: <any>[],
    parentCategories: <any>[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data
    }),
      builder.addCase(getParentCategories.fulfilled, (state, action) => {
        state.parentCategories = action.payload.data
      })
  }
})

export default appCategoriesSlice.reducer
