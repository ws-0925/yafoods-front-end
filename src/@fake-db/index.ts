import mock from './mock'

import './apps/promoCodeList'
import './apps/channelList'
import './apps/notificationList'
import './apps/userList'
import './apps/orderList'
import './apps/driversList'
import './apps/logsList'
import './apps/productsList'

mock.onAny().passThrough()
