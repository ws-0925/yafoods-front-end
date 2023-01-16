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
export const getSpecialOffers = createAsyncThunk('appSpecialOffers/getSpecialOffers', async (data: any) => {
  const response = await api.get(
    `/api/backend/special-offers?limit=${data.limit}&offset=${data.offset}&search=${data.search}`,
    {
      headers: {
        'accept-language': 'en'
      }
    }
  )

  return response.data
})

export const getAllSpecialOffers = createAsyncThunk('appSpecialOffers/getAllSpecialOffers', async () => {
  const response = await api.get('/api/backend/special-offers', {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const getSpecialOffer = createAsyncThunk('appSpecialOffers/getSpecialOffer', async (id: number) => {
  const response = await api.get(`/api/backend/special-offer/${id}`, {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const changeStatus = createAsyncThunk('appCategories/changeStatus', async (data: any, { dispatch }: Redux) => {
  const response = await api.put(`/api/backend/offer-status-change/${data.id}`, data.data)

  if (response.data?.message) {
    dispatch(appSpecialOffersSlice.actions.updateSpecialOffers(data.id))

    return response.data
  }

  return response.data
})

export const addSpecialOffer = createAsyncThunk(
  'appSpecialOffers/addSpecialOffer',
  async (formData: any, { dispatch }: Redux) => {
    try {
      const response = await api2.post('/api/backend/special-offer', formData)
      dispatch(getAllSpecialOffers())

      return response.data
    } catch (err) {
      return err
    }
  }
)

export const editSpecialOffer = createAsyncThunk(
  'appSpecialOffers/editSpecialOffer',
  async (data: any, { dispatch }: Redux) => {
    try {
      const response = await api2.put(`/api/backend/special-offer/${data.id}`, data.formData)
      dispatch(getAllSpecialOffers())

      return response.data
    } catch (err) {
      return err
    }
  }
)

export const deleteSpecialOffer = createAsyncThunk(
  'appSpecialOffers/deleteSpecialOffer',
  async (id: number, { dispatch }: Redux) => {
    const response = await api.delete(`/api/backend/special-offer-delete/${id}`)
    dispatch(getAllSpecialOffers())

    return response.data
  }
)

export const appSpecialOffersSlice = createSlice({
  name: 'appSpecialOffers',
  initialState: {
    specialOffers: <any>[],
    totalCount: <number>0,
    specialOffer: <any>[]
  },
  reducers: {
    updateSpecialOffers(state, action) {
      state.specialOffers = state.specialOffers.map((specialOffer: any) => {
        if (specialOffer.special_offer_id.id === action.payload) {
          return {
            ...specialOffer,
            special_offer_id: { ...specialOffer.special_offer_id, status: 1 - specialOffer.special_offer_id.status }
          }
        } else {
          return { ...specialOffer }
        }
      })
    }
  },
  extraReducers: builder => {
    builder.addCase(getSpecialOffers.fulfilled, (state, action) => {
      ;(state.specialOffers = action.payload.data), (state.totalCount = action.payload.count)
    })
    builder.addCase(getAllSpecialOffers.fulfilled, (state, action) => {
      ;(state.specialOffers = action.payload.data), (state.totalCount = action.payload.count)
    })
    builder.addCase(getSpecialOffer.fulfilled, (state, action) => {
      state.specialOffer = action.payload.data
    })
  }
})

export default appSpecialOffersSlice.reducer
