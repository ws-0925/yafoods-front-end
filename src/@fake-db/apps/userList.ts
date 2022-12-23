// ** Mock
import mock from 'src/@fake-db/mock'

// ** Type
import { UserType } from 'src/types/apps/userType'

const users: UserType[] = [
  {
    id: 1,
    name: 'dave',
    mobileNumber: '(479) 232-9151',
    city: 'Riyadh',
    area: 'aaa',
    address: 'address-192-1',
    preferredLanguage: 'English',
    totalActiveOrders: 12,
    status: 'active',
    avatar: ''
  },
  {
    id: 2,
    name: 'Jack',
    mobileNumber: '(479) 232-9151',
    city: 'Jeddah',
    area: 'bbb',
    address: 'address-1-4',
    preferredLanguage: 'Arabic',
    totalActiveOrders: 2,
    status: 'active',
    avatar: ''
  },
  {
    id: 3,
    name: 'kola',
    mobileNumber: '(479) 232-9151',
    city: 'Dammam',
    area: 'ccc',
    address: 'address-5-1',
    preferredLanguage: 'English',
    totalActiveOrders: 7,
    status: 'inactive',
    avatar: ''
  },
  {
    id: 4,
    name: 'Alex',
    mobileNumber: '(479) 232-9151',
    city: 'Tabuk',
    area: 'aaa',
    address: 'address-1-5',
    preferredLanguage: 'English',
    totalActiveOrders: 5,
    status: 'active',
    avatar: ''
  },
  {
    id: 5,
    name: 'diver',
    mobileNumber: '(479) 232-9151',
    city: 'Tabuk',
    area: 'ddd',
    address: 'address-1-1',
    preferredLanguage: 'Arabic',
    totalActiveOrders: 12,
    status: 'inactive',
    avatar: ''
  }
]

mock.onGet('/apps/users/list').reply(() => {
  return [
    200,
    {
      users: users
    }
  ]
})
