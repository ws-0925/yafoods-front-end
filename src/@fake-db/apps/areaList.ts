// ** Mock
import mock from 'src/@fake-db/mock'

// ** Type
import { AreaType } from 'src/types/apps/areaType'

const areas: AreaType[] = [
  {
    id: 1,
    eName: 'aaa',
    aName: '',
    city: 'Riyadh',
    areaCode: '',
    latitude: '',
    longitude: '',
    status: 'active'
  },
  {
    id: 2,
    eName: 'bbb',
    aName: '',
    city: 'Jeddah',
    areaCode: '',
    latitude: '',
    longitude: '',
    status: 'active'
  },
  {
    id: 3,
    eName: 'ccc',
    aName: '',
    city: 'Dammam',
    areaCode: '',
    latitude: '',
    longitude: '',
    status: 'active'
  },
  {
    id: 4,
    eName: 'ddd',
    aName: '',
    city: 'Dammam',
    areaCode: '',
    latitude: '',
    longitude: '',
    status: 'inactive'
  },
  {
    id: 5,
    eName: 'eee',
    aName: '',
    city: 'Medina',
    areaCode: '',
    latitude: '',
    longitude: '',
    status: 'active'
  },
  {
    id: 6,
    eName: 'adf',
    aName: '',
    city: 'Jeddah',
    areaCode: '',
    latitude: '',
    longitude: '',
    status: 'inactive'
  },
  {
    id: 7,
    eName: 'qwe',
    aName: '',
    city: 'Tabuk',
    areaCode: '',
    latitude: '',
    longitude: '',
    status: 'active'
  },
  {
    id: 8,
    eName: 'zxc',
    aName: '',
    city: 'Riyadh',
    areaCode: '',
    latitude: '',
    longitude: '',
    status: 'active'
  },
  {
    id: 9,
    eName: 'abc',
    aName: '',
    city: 'Tabuk',
    areaCode: '',
    latitude: '',
    longitude: '',
    status: 'inactive'
  },
  {
    id: 10,
    eName: 'tgd',
    aName: '',
    city: 'Riyadh',
    areaCode: '',
    latitude: '',
    longitude: '',
    status: 'active'
  },
  {
    id: 11,
    eName: 'xxx',
    aName: '',
    city: 'Hail',
    areaCode: '',
    latitude: '',
    longitude: '',
    status: 'inactive'
  }
]

mock.onGet('/apps/areas/list').reply(() => {
  return [
    200,
    {
      areas: areas
    }
  ]
})
