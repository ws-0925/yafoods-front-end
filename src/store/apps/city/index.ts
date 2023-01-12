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
  const response = await api.get(`/api/backend/city/list`, {
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
  dispatch(getCities())

  return response.data
})

export const deleteCity = createAsyncThunk('appCities/deleteCity', async (id: number, { dispatch }: Redux) => {
  const response = await api.delete(`/api/backend/city/${id}`)
  dispatch(getCities())

  return response.data
})

export const changeStatus = createAsyncThunk('appCities/changeStatus', async (data: any, { dispatch }: Redux) => {
  const response = await api.put(`/api/backend/city-status/${data.id}`, data.data)

  if (response.data?.message) {
    dispatch(appCitiesSlice.actions.updateCity(data.id))

    return response.data
  } else return response.data
})

export const appCitiesSlice = createSlice({
  name: 'appCities',
  initialState: {
    cities: <any>[],
    cityList: <any>[],
    totalCount: <number>0
  },
  reducers: {
    updateCity(state, action) {
      state.cities = state.cities.map((city: any) => {
        if (city.id === action.payload) {
          return { ...city, status: 1 - city.status }
        }

        return { ...city }
      })
    }
  },
  extraReducers: builder => {
    builder.addCase(getCities.fulfilled, (state, action) => {
      state.cities = action.payload.data
    })
    builder.addCase(getCityList.fulfilled, (state, action) => {
      state.cityList = action.payload.data
    })
  }
})

export default appCitiesSlice.reducer
