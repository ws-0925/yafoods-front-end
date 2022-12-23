// ** Mock
import mock from 'src/@fake-db/mock'

// ** Type
import { VehicleCategoryType } from 'src/types/apps/driverType'
import { VehiclesType } from 'src/types/apps/driverType'
import { VehiclesDriverType } from 'src/types/apps/driverType'

const categories: VehicleCategoryType[] = [
  {
    id: 1,
    eName: 'Personal',
    status: 'active',
    aName: ''
  },
  {
    id: 2,
    eName: 'Lease',
    status: 'inactive',
    aName: ''
  },
  {
    id: 3,
    eName: 'Automobile',
    status: 'active',
    aName: ''
  },
  {
    id: 4,
    eName: 'Car',
    status: 'active',
    aName: ''
  },
  {
    id: 5,
    eName: 'Motor Car',
    status: 'inactive',
    aName: ''
  }
]

const types: VehiclesType[] = [
  {
    id: 1,
    eName: 'Personal',
    status: 'active',
    aName: ''
  },
  {
    id: 2,
    eName: 'Lease',
    status: 'inactive',
    aName: ''
  },
  {
    id: 3,
    eName: 'Automobile',
    status: 'active',
    aName: ''
  },
  {
    id: 4,
    eName: 'Car',
    status: 'active',
    aName: ''
  },
  {
    id: 5,
    eName: 'Motor Car',
    status: 'inactive',
    aName: ''
  }
]

const drivers: VehiclesDriverType[] = [
  {
    id: 1,
    name: {
      firstName: 'Jhon ',
      lastName: 'Doe'
    },
    email: 'jhondoe@gmail.com',
    mobile: '123152',
    gender: 'male',
    password: '',
    confirmPassword: '',
    vehicles: '',
    status: 'inactive'
  },
  {
    id: 2,
    name: {
      firstName: 'Jack ',
      lastName: 'Steven'
    },
    email: 'jacksteven@gmail.com',
    mobile: '123152',
    gender: 'male',
    password: '',
    confirmPassword: '',
    vehicles: '',
    status: 'active'
  },
  {
    id: 3,
    name: {
      firstName: 'alexandra ',
      lastName: 'doe'
    },
    email: 'alexandradoe@gmail.com',
    mobile: '123152',
    gender: 'male',
    password: '',
    confirmPassword: '',
    vehicles: '',
    status: 'inactive'
  }
]

mock.onGet('/apps/drivers/categories/list').reply(() => {
  return [
    200,
    {
      categories: categories
    }
  ]
})

mock.onGet('/apps/drivers/type/list').reply(() => {
  return [
    200,
    {
      types: types
    }
  ]
})

mock.onGet('/apps/drivers/drivers/list').reply(() => {
  return [
    200,
    {
      drivers: drivers
    }
  ]
})
