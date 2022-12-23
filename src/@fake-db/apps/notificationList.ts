// ** Mock
import mock from 'src/@fake-db/mock'

// ** Type
import { NotificationType } from 'src/types/apps/notificationType'

const notifications: NotificationType[] = [
  {
    id: 1,
    eTitle: 'Your Promo Code Updated',
    aTitle: '',
    eSubject: '',
    aSubject: '',
    eMessage: '',
    aMessage: '',
    status: 'active',
    type: 'App Notification'
  },
  {
    id: 2,
    eTitle: 'Welcome to Yaa Foods',
    aTitle: '',
    eSubject: '',
    aSubject: '',
    eMessage: '',
    aMessage: '',
    status: 'active',
    type: 'App Notification'
  },
  {
    id: 3,
    eTitle: 'Order Successful',
    aTitle: '',
    eSubject: '',
    aSubject: '',
    eMessage: '',
    aMessage: '',
    status: 'inactive',
    type: 'App Notification'
  },
  {
    id: 4,
    eTitle: 'New User Created',
    aTitle: '',
    eSubject: '',
    aSubject: '',
    eMessage: '',
    aMessage: '',
    status: 'active',
    type: 'App Notification'
  },
  {
    id: 5,
    eTitle: 'Welcome to Yaa Foods',
    aTitle: '',
    eSubject: '',
    aSubject: '',
    eMessage: '',
    aMessage: '',
    status: 'active',
    type: 'App Notification'
  }
]

mock.onGet('/apps/notifications/list').reply(() => {
  return [
    200,
    {
      notifications: notifications
    }
  ]
})
