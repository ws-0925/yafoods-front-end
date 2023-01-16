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
  const response = await api.get(
    `/api/backend/cities?limit=${data.limit}&offset=${data.offset}&search=${data.search}`,
    {
      headers: {
        'accept-language': 'en'
      }
    }
  )

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

export const getCity = createAsyncThunk('appCities/getCity', async (id: number, { dispatch }: Redux) => {
  const response = await api.get(`/api/backend/city/${id}`, {
    headers: {
      'accept-language': 'en'
    }
  })
  dispatch(getAllCities())

  return response.data
})

export const addCity = createAsyncThunk('appCities/addCity', async (cityData: any, { dispatch }: Redux) => {
  try {
    const response = await api.post(`/api/backend/city`, cityData)
    dispatch(getAllCities())

    return response.data
  } catch (err) {
    return err
  }
})

export const deleteCity = createAsyncThunk('appCities/deleteCity', async (data: any, { dispatch }: Redux) => {
  try {
    const response = await api.delete(`/api/backend/city/${data.id}`)
    dispatch(getCities(data))

    return response.data
  } catch (err) {
    return err
  }
})

export const editCity = createAsyncThunk('appCities/editCity', async (data: any, { dispatch }: Redux) => {
  try {
    const response = await api.put(`/api/backend/city/${data.id}`, data.data)
    dispatch(getAllCities())

    return response.data
  } catch (err) {
    return err
  }
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
    city: <any>[],
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
      ;(state.cities = action.payload.data), (state.totalCount = action.payload.count)
    })
    builder.addCase(getAllCities.fulfilled, (state, action) => {
      ;(state.cities = action.payload.data), (state.totalCount = action.payload.count)
    })
    builder.addCase(getCityList.fulfilled, (state, action) => {
      state.cityList = action.payload.data
    })
    builder.addCase(getCity.fulfilled, (state, action) => {
      state.city = action.payload.data
    })
  }
})

export default appCitiesSlice.reducer
