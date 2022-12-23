// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import city from 'src/store/apps/city'
import area from 'src/store/apps/area'
import category from 'src/store/apps/category'
import products from 'src/store/apps/products'
import promoCode from 'src/store/apps/promoCode'
import channel from 'src/store/apps/channel'
import notification from 'src/store/apps/notification'
import users from 'src/store/apps/users'
import order from 'src/store/apps/order'
import drivers from 'src/store/apps/drivers'
import logs from 'src/store/apps/logs'

export const store = configureStore({
  reducer: {
    city,
    area,
    category,
    products,
    promoCode,
    channel,
    notification,
    users,
    order,
    drivers,
    logs
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
