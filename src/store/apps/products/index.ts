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

export const getProducts = createAsyncThunk('appProducts/getProducts', async (data: any) => {
  const response = await api.get(`/api/backend/products?limit=${data.limit}&offset=${data.offset}`, {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const getAllProducts = createAsyncThunk('appProducts/getAllProducts', async () => {
  const response = await api.get('/api/backend/products/list', {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const getProduct = createAsyncThunk('appProducts/getProduct', async (id: string) => {
  const response = await api.get(`/api/backend/product/${id}`, {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const getVariantProducts = createAsyncThunk('appProducts/getVariantProducts', async () => {
  const response = await api.get('/api/backend/product-variants?limit=10000', {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const getAllVariantProducts = createAsyncThunk('appProducts/getAllVariantProducts', async () => {
  const response = await api.get('/api/backend/product-variants', {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const getVariantProduct = createAsyncThunk('appProducts/getVariantProduct', async (id: string) => {
  const response = await api.get(`/api/backend/product-variant/${id}`, {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const addProduct = createAsyncThunk('appProducts/addProduct', async (productData: any, { dispatch }: Redux) => {
  const response = await api.post('/api/backend/product', productData)
  dispatch(getAllProducts())

  return response.data
})

export const addVariantProduct = createAsyncThunk(
  'appProducts/addVariantProduct',
  async (productData: any, { dispatch }: Redux) => {
    const response = await api2.post('/api/backend/product-variant', productData)
    dispatch(getAllVariantProducts())

    return response.data
  }
)

export const editProduct = createAsyncThunk('appProducts/editProduct', async (Data: any, { dispatch }: Redux) => {
  const response = await api.put(`/api/backend/product/${Data.id}`, Data.productData)
  dispatch(getAllProducts())

  return response.data
})

export const editProductVariant = createAsyncThunk(
  'appProducts/editProductVariant',
  async (Data: any, { dispatch }: Redux) => {
    const response = await api2.put(`/api/backend/product-variant/${Data.id}`, Data.formData)
    dispatch(getAllVariantProducts())

    return response.data
  }
)

export const deleteProduct = createAsyncThunk('appProducts/deleteProduct', async (id: number, { dispatch }: Redux) => {
  const response = await api.delete(`/api/backend/product-delete/${id}`)
  dispatch(getAllProducts())

  return response.data
})

export const deleteProductVariant = createAsyncThunk(
  'appProducts/deleteProductVariant',
  async (id: number, { dispatch }: Redux) => {
    const response = await api.delete(`/api/backend/product-variant-delete/${id}`)
    dispatch(getAllVariantProducts())

    return response.data
  }
)

export const changeStatus = createAsyncThunk('appCategories/changeStatus', async (data: any, { dispatch }: Redux) => {
  const response = await api.put(`/api/backend/product-status-change/${data.id}`, data.data)

  if (response.data?.message) {
    dispatch(appProductsSlice.actions.updateProduct(data.id))

    return response.data
  } else return response.data
})

export const changeVariantStatus = createAsyncThunk(
  'appCategories/changeVariantStatus',
  async (data: any, { dispatch }: Redux) => {
    const response = await api.put(`/api/backend/product-variant-status-change/${data.id}`, data.data)

    if (response.data?.message) {
      dispatch(appProductsSlice.actions.updateVariantProduct(data.id))

      return response.data
    } else return response.data
  }
)

export const appProductsSlice = createSlice({
  name: 'appProducts',
  initialState: {
    products: <any>[],
    product: <any>[],
    variantProducts: <any>[],
    variantProduct: <any>[],
    sortProducts: <any>[],
    totalCount: <number>0,
    totalVariantCount: <number>0
  },
  reducers: {
    updateProduct(state, action) {
      state.products = state.products.map((product: any) => {
        if (product.id === action.payload) {
          return { ...product, status: 1 - product.status }
        } else {
          return { ...product }
        }
      })
    },
    updateVariantProduct(state, action) {
      state.variantProducts = state.variantProducts.map((variantProduct: any) => {
        if (variantProduct.product_variant_id.id === action.payload) {
          return {
            ...variantProduct,
            product_variant_id: {
              ...variantProduct.product_variant_id,
              status: 1 - variantProduct.product_variant_id.status
            }
          }
        } else {
          return { ...variantProduct }
        }
      })
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.sortProducts = action.payload.products
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      ;(state.products = action.payload.data), (state.totalCount = action.payload.count)
    })
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      ;(state.products = action.payload.data), (state.totalCount = action.payload.count)
    })
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload.data
    })
    builder.addCase(getVariantProducts.fulfilled, (state, action) => {
      ;(state.variantProducts = action.payload.data), (state.totalVariantCount = action.payload.count)
    })
    builder.addCase(getAllVariantProducts.fulfilled, (state, action) => {
      ;(state.variantProducts = action.payload.data), (state.totalVariantCount = action.payload.count)
    })
    builder.addCase(getVariantProduct.fulfilled, (state, action) => {
      state.variantProduct = action.payload.data
    })
  }
})

export default appProductsSlice.reducer
