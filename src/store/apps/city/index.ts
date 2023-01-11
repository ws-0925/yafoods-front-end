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
export const getCities = createAsyncThunk('appCities/getCities', async (data: any) => {
  const response = await api.get(`/api/backend/cities?limit=${data.limit}&offset${data.offset}`, {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const getAllCities = createAsyncThunk('appCities/getAllCities', async () => {
  const response = await api.get(`/api/backend/cities`, {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const getCityList = createAsyncThunk('appCities/getCityList', async () => {
  const response = await api.get(`/api/backend/city/list`, {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const addCity = createAsyncThunk('appCities/addCity', async (cityData: any, { dispatch }: Redux) => {
  const response = await api.post(`/api/backend/city`, cityData)
  dispatch(getAllCities())

  return response.data
})

export const appCitiesSlice = createSlice({
  name: 'appCities',
  initialState: {
    cities: <any>[],
    cityList: <any>[],
    totalCount: <number>0
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllCities.fulfilled, (state, action) => {
      ;(state.cities = action.payload.data), (state.totalCount = action.payload.count)
    })
    builder.addCase(getCities.fulfilled, (state, action) => {
      ;(state.cities = action.payload.data), (state.totalCount = action.payload.count)
    })
    builder.addCase(getCityList.fulfilled, (state, action) => {
      state.cityList = action.payload.data
    })
  }
})

export default appCitiesSlice.reducer
