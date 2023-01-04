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
export const getAreas = createAsyncThunk('appAreas/getAreas', async () => {
  const response = await api.get('/api/backend/areas', {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const addArea = createAsyncThunk('appAreas/addArea', async (areaData: any, { dispatch }: Redux) => {
  const response = await api.post('/api/backend/area', areaData)
  dispatch(getAreas())

  return response.data
})

export const appAreasSlice = createSlice({
  name: 'appAreas',
  initialState: {
    areas: <any>[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAreas.fulfilled, (state, action) => {
      state.areas = action.payload.data
    })
  }
})

export default appAreasSlice.reducer
