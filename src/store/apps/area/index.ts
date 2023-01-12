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
export const getAreas = createAsyncThunk('appAreas/getAreas', async (data: any) => {
  const response = await api.get(`/api/backend/areas?limit=${data.limit}&offset=${data.offset}`, {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const getAllAreas = createAsyncThunk('appAreas/getAllAreas', async () => {
  const response = await api.get('/api/backend/area/list', {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const addArea = createAsyncThunk('appAreas/addArea', async (areaData: any, { dispatch }: Redux) => {
  const response = await api.post('/api/backend/area', areaData)
  dispatch(getAllAreas())

  return response.data
})

export const appAreasSlice = createSlice({
  name: 'appAreas',
  initialState: {
    areas: <any>[],
    totalCount: <number>0
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAreas.fulfilled, (state, action) => {
      ;(state.areas = action.payload.data), (state.totalCount = action.payload.count)
    })
    builder.addCase(getAllAreas.fulfilled, (state, action) => {
      ;(state.areas = action.payload.data), (state.totalCount = action.payload.count)
    })
  }
})

export default appAreasSlice.reducer
