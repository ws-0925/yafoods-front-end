// ** Mock
import mock from 'src/@fake-db/mock'

// ** Type
import { CityType } from 'src/types/apps/cityType'

const cities: CityType[] = [
  {
    id: 1,
    eName: 'Riyadh',
    description: 'our city is very clean',
    status: 'active',
    aName: '',
    region: '',
    storeId: 1
  },
  {
    id: 2,
    eName: 'Jeddah',
    description: 'our city is very clean',
    status: 'inactive',
    aName: '',
    region: '',
    storeId: 1
  },
  {
    id: 3,
    eName: 'Dammam',
    description: 'the famous city',
    status: 'active',
    aName: '',
    region: '',
    storeId: 1
  },
  {
    id: 4,
    eName: 'Mecca',
    description: 'our city is very clean',
    status: 'active',
    aName: '',
    region: '',
    storeId: 1
  },
  {
    id: 5,
    eName: 'Medina',
    description: 'the famous city',
    status: 'inactive',
    aName: '',
    region: '',
    storeId: 1
  },
  {
    id: 6,
    eName: 'Taif',
    description: 'our city is very clean',
    status: 'active',
    aName: '',
    region: '',
    storeId: 1
  },
  {
    id: 7,
    eName: 'Dammam',
    description: 'our city is very clean',
    status: 'inactive',
    aName: '',
    region: '',
    storeId: 1
  },
  {
    id: 8,
    eName: 'Mecca',
    description: 'the famous city',
    status: 'active',
    aName: '',
    region: '',
    storeId: 1
  },
  {
    id: 9,
    eName: 'Medina',
    description: 'our city is very clean',
    status: 'active',
    aName: '',
    region: '',
    storeId: 1
  },
  {
    id: 10,
    eName: 'Taif',
    description: 'the famous city',
    status: 'inactive',
    aName: '',
    region: '',
    storeId: 1
  },
  {
    id: 11,
    eName: 'Al Khobar',
    description: 'the famous city',
    status: 'active',
    aName: '',
    region: '',
    storeId: 1
  }
]

mock.onGet('/apps/cities/list').reply(() => {
  return [
    200,
    {
      cities: cities
    }
  ]
})
