// ** Redux Imports

// import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import api from 'src/utils/api'

// interface Redux {
//   getState: any
//   dispatch: Dispatch<any>
// }

export const getCountries = createAsyncThunk('appCountries/getCountries', async () => {
  const response = await api.get(`/api/backend/countries`, {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const appCountriesSlice = createSlice({
  name: 'appCountries',
  initialState: {
    countries: <any>[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.countries = action.payload.data
    })
  }
})

export default appCountriesSlice.reducer
