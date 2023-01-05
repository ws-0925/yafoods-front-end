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
export const getSpecialOffers = createAsyncThunk('appSpecialOffers/getSpecialOffers', async () => {
  const response = await api.get('/api/backend/special-offers', {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const addSpecialOffer = createAsyncThunk(
  'appSpecialOffers/addSpecialOffer',
  async (formData: any, { dispatch }: Redux) => {
    const response = await api2.post('/api/backend/special-offer', formData)
    dispatch(getSpecialOffers())

    return response.data
  }
)

export const editSpecialOffer = createAsyncThunk(
  'appSpecialOffers/editSpecialOffer',
  async (data: any, { dispatch }: Redux) => {
    const response = await api2.put(`/api/backend/special-offer/${data.id}`, data.formData)
    dispatch(getSpecialOffers())

    return response.data
  }
)

export const deleteSpecialOffer = createAsyncThunk(
  'appSpecialOffers/deleteSpecialOffer',
  async (id: number, { dispatch }: Redux) => {
    const response = await api.delete(`/api/backend/special-offer-delete/${id}`)
    dispatch(getSpecialOffers())

    return response.data
  }
)

export const appSpecialOffersSlice = createSlice({
  name: 'appSpecialOffers',
  initialState: {
    specialOffers: <any>[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSpecialOffers.fulfilled, (state, action) => {
      state.specialOffers = action.payload.data
    })
  }
})

export default appSpecialOffersSlice.reducer
