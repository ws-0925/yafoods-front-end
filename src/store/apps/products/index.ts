// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import api from 'src/utils/api'
import api2 from 'src/utils/api2'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users

export const fetchData = createAsyncThunk('appProducts/fetchData', async () => {
  const response = await axios.get('/apps/products/list')

  return response.data
})

export const getProducts = createAsyncThunk('appProducts/getProducts', async () => {
  const response = await api.get('/api/backend/products', {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const getVariantProducts = createAsyncThunk('appProducts/getVariantProducts', async () => {
  const response = await api.get('/api/backend/product-variants', {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const addProduct = createAsyncThunk('appProducts/addProduct', async (productData: any, { dispatch }: Redux) => {
  const response = await api.post('/api/backend/product', productData)
  dispatch(getProducts())

  return response.data
})

export const addVariantProduct = createAsyncThunk(
  'appProducts/addVariantProduct',
  async (productData: any, { dispatch }: Redux) => {
    const response = await api2.post('/api/backend/product-variant', productData)
    dispatch(getVariantProducts())

    return response.data
  }
)

export const editProduct = createAsyncThunk('appProducts/editProduct', async (Data: any, { dispatch }: Redux) => {
  const response = await api.put(`/api/backend/product/${Data.id}`, Data.productData)
  dispatch(getProducts())

  return response.data
})

export const editProductVariant = createAsyncThunk(
  'appProducts/editProductVariant',
  async (Data: any, { dispatch }: Redux) => {
    const response = await api2.put(`/api/backend/product-variant/${Data.product_variant_id}`, Data.formData)
    dispatch(getVariantProducts())

    return response.data
  }
)

export const deleteProduct = createAsyncThunk('appProducts/deleteProduct', async (id: number, { dispatch }: Redux) => {
  const response = await api.delete(`/api/backend/product-delete/${id}`)
  dispatch(getProducts())

  return response.data
})

export const deleteProductVariant = createAsyncThunk(
  'appProducts/deleteProductVariant',
  async (id: number, { dispatch }: Redux) => {
    const response = await api.delete(`/api/backend/product-variant-delete/${id}`)
    dispatch(getVariantProducts())

    return response.data
  }
)

export const appProductsSlice = createSlice({
  name: 'appProducts',
  initialState: {
    products: <any>[],
    variantProducts: <any>[],
    sortProducts: <any>[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.sortProducts = action.payload.products
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.data
    })
    builder.addCase(getVariantProducts.fulfilled, (state, action) => {
      state.variantProducts = action.payload.data
    })
  }
})

export default appProductsSlice.reducer
