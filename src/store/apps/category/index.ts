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
export const getCategories = createAsyncThunk('appCategories/getCategories', async (data: any) => {
  const response = await api.get(`/api/backend/categories?limit=${data.limit}&offset=${data.offset}`, {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const getAllCategories = createAsyncThunk('appCategories/getAllCategories', async () => {
  const response = await api.get('/api/backend/categories', {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const getCategory = createAsyncThunk('appCategories/getCategory', async (id: string) => {
  const response = await api.get(`/api/backend/category/${id}`, {
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
  dispatch(getAllCategories())

  return response.data
})

export const editCategory = createAsyncThunk('appCategories/editCategory', async (data: any) => {
  const response = await api2.put(`/api/backend/category/${data.id}`, data.formData)

  return response.data
})

export const changeStatus = createAsyncThunk('appCategories/changeStatus', async (data: any, { dispatch }: Redux) => {
  const response = await api.put(`/api/backend/category-status/${data.id}`, data.data)
  dispatch(getAllCategories())

  return response.data
})

export const deleteCategory = createAsyncThunk(
  'appCategories/deleteCategory',
  async (id: number, { dispatch }: Redux) => {
    const response = await api.delete(`/api/backend/category/${id}`)
    dispatch(getAllCategories())

    return response.data
  }
)

export const appCategoriesSlice = createSlice({
  name: 'appCategories',
  initialState: {
    totalCount: <number>0,
    categories: <any>[],
    category: <any>[],
    parentCategories: <any>[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      ;(state.categories = action.payload.data), (state.totalCount = action.payload.totalCount)
    })
    builder.addCase(getCategories.fulfilled, (state, action) => {
      ;(state.categories = action.payload.data), (state.totalCount = action.payload.count)
    })
    builder.addCase(getParentCategories.fulfilled, (state, action) => {
      state.parentCategories = action.payload.data
    })
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.category = action.payload.data
    })
  }
})

export default appCategoriesSlice.reducer
