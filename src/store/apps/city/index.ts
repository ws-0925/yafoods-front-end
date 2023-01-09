// ** Redux Imports

import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import api from 'src/utils/api'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users
export const getCities = createAsyncThunk('appCities/getCities', async () => {
  const response = await api.get(`/api/backend/cities`, {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const addCity = createAsyncThunk('appCities/addCity', async (cityData: any, { dispatch }: Redux) => {
  const response = await api.post(`/api/backend/city`, cityData)
  dispatch(getCities())

  return response.data
})

export const appCitiesSlice = createSlice({
  name: 'appCities',
  initialState: {
    cities: <any>[],
    totalCount: <number>0
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCities.fulfilled, (state, action) => {
      ;(state.cities = action.payload.data), (state.totalCount = action.payload.count)
    })
  }
})

export default appCitiesSlice.reducer
