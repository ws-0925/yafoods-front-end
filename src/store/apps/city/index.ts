// ** Redux Imports
// import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import api from 'src/utils/api'

// interface Redux {
//   getState: any
//   dispatch: Dispatch<any>
// }

// ** Fetch Users
export const getCities = createAsyncThunk('appCities/getCities', async () => {
  const response = await api.get('/api/backend/cities', {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const addCity = createAsyncThunk('appCities/addCity', async (cityData: any) => {
  const response = await api.post('/api/backend/city', cityData)
  console.log(response.data)

  // return response.data
})

export const appCitiesSlice = createSlice({
  name: 'appCities',
  initialState: {
    cities: <any>[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCities.fulfilled, (state, action) => {
      state.cities = action.payload.data
    })
  }
})

export default appCitiesSlice.reducer
