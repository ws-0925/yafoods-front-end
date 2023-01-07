// ** Toolkit imports
import { configureStore, combineReducers } from '@reduxjs/toolkit'

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
import adminUsers from 'src/store/apps/admin-users'
import specialOffers from 'src/store/apps/special-offers'

const rootReducer = combineReducers({
  city: city,
  area: area,
  category: category,
  products: products,
  promoCode: promoCode,
  channel: channel,
  notification: notification,
  users: users,
  order: order,
  drivers: drivers,
  logs: logs,
  adminUsers: adminUsers,
  specialOffers: specialOffers
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
