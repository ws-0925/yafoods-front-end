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
export const getProducts = createAsyncThunk('appProducts/getProducts', async () => {
  const response = await api.get('/api/backend/products', {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const addProduct = createAsyncThunk('appProducts/addProduct', async (productData: any, { dispatch }: Redux) => {
  const response = await api.put('/api/backend/product', productData)
  dispatch(getProducts())

  return response.data
})

export const editProduct = createAsyncThunk('appProducts/editProduct', async (Data: any, { dispatch }: Redux) => {
  const response = await api.put(`/api/backend/product/${Data.id}`, Data.productData)
  dispatch(getProducts())

  return response.data
})

export const appProductsSlice = createSlice({
  name: 'appProducts',
  initialState: {
    products: <any>[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.data
    })
  }
})

export default appProductsSlice.reducer
