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
  const response = await api.get(`/api/backend/areas?limit=${data.limit}&offset=${data.offset}&search=${data.search}`, {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

export const getAllAreas = createAsyncThunk('appAllAreas/getAreas', async () => {
  const response = await api.get(`/api/backend/areas`, {
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

export const deleteArea = createAsyncThunk('appAreas/deleteArea', async (id: number, { dispatch }: Redux) => {
  const response = await api.delete(`/api/backend/area/${id}`)
  dispatch(getAllAreas())

  return response.data
})

export const editArea = createAsyncThunk('appAreas/editArea', async (data: any, { dispatch }: Redux) => {
  const response = await api.put(`/api/backend/area/${data.id}`, data.data)
  dispatch(getAllAreas())

  return response.data
})

export const changeStatus = createAsyncThunk('appAreas/changeStatus', async (data: any, { dispatch }: Redux) => {
  const response = await api.put(`/api/backend/area-status/${data.id}`, data.data)

  if (response.data?.message) {
    dispatch(appAreasSlice.actions.updateArea(data.id))

    return response.data
  } else return response.data
})

export const appAreasSlice = createSlice({
  name: 'appAreas',
  initialState: {
    areas: <any>[],
    totalCount: <number>0
  },
  reducers: {
    updateArea(state, action) {
      state.areas = state.areas.map((area: any) => {
        if (area.id === action.payload) {
          return { ...area, status: 1 - area.status }
        }

        return { ...area }
      })
    }
  },
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
