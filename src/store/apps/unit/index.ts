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
// export const getUnits = createAsyncThunk('appUnits/getUnits', async (data: any) => {
//   const response = await api.get(
//     `/api/backend/unites?limit=${data.limit}&offset=${data.offset}&search=${data.search}`,
//     {
//       headers: {
//         'accept-language': 'en'
//       }
//     }
//   )

//   return response.data
// })

// export const getAllUnits = createAsyncThunk('appUnits/getAllUnits', async () => {
//   const response = await api.get(`/api/backend/unites`, {
//     headers: {
//       'accept-language': 'en'
//     }
//   })

//   return response.data
// })

export const getUnitList = createAsyncThunk('appUnits/getUnitList', async () => {
  const response = await api.get(`/api/backend/unit/list`, {
    headers: {
      'accept-language': 'en'
    }
  })

  return response.data
})

// export const addCity = createAsyncThunk('appUnits/addCity', async (cityData: any, { dispatch }: Redux) => {
//   const response = await api.post(`/api/backend/city`, cityData)
//   dispatch(getAllUnits())

//   return response.data
// })

// export const deleteCity = createAsyncThunk('appUnits/deleteCity', async (id: number, { dispatch }: Redux) => {
//   const response = await api.delete(`/api/backend/city/${id}`)
//   dispatch(getAllUnits())

//   return response.data
// })

// export const changeStatus = createAsyncThunk('appUnits/changeStatus', async (data: any, { dispatch }: Redux) => {
//   const response = await api.put(`/api/backend/city-status/${data.id}`, data.data)

//   if (response.data?.message) {
//     dispatch(appUnitsSlice.actions.updateCity(data.id))

//     return response.data
//   } else return response.data
// })

export const appUnitsSlice = createSlice({
  name: 'appUnits',
  initialState: {
    unites: <any>[],
    unitList: <any>[],
    totalCount: <number>0
  },
  reducers: {},
  extraReducers: builder => {
    // builder.addCase(getUnits.fulfilled, (state, action) => {
    //   ;(state.unites = action.payload.data), (state.totalCount = action.payload.count)
    // })
    // builder.addCase(getAllUnits.fulfilled, (state, action) => {
    //   ;(state.unites = action.payload.data), (state.totalCount = action.payload.count)
    // })
    builder.addCase(getUnitList.fulfilled, (state, action) => {
      state.unitList = action.payload.data
    })
  }
})

export default appUnitsSlice.reducer
