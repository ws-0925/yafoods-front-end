import mock from './mock'

import './auth/jwt'
import './apps/productsList'
import './apps/promoCodeList'
import './apps/channelList'
import './apps/notificationList'
import './apps/userList'
import './apps/orderList'
import './apps/driversList'
import './apps/logsList'

mock.onAny().passThrough()
