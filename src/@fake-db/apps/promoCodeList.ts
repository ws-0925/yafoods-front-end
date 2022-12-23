// ** Mock
import mock from 'src/@fake-db/mock'

// ** Type
import { PromoCodeType } from 'src/types/apps/PromoCodeType'

const promoCodes: PromoCodeType[] = [
  {
    id: 1,
    eName: 'Cooking Essentials',
    aName: '',
    type: '',
    discountType: '',
    status: 'active',
    brandName: '',
    user: '',
    quantity: 1,
    percentageAmount: 1,
    minimumOrder: 1,
    maximumScope: 1,
    usagePerCustomer: 1,
    startDate: '',
    endDate: '',
    products: '',
    cities: '',
    channel: 'A'
  },
  {
    id: 2,
    eName: 'Banner',
    aName: '',
    type: '',
    discountType: '',
    status: 'active',
    brandName: '',
    user: '',
    quantity: 1,
    percentageAmount: 1,
    minimumOrder: 1,
    maximumScope: 1,
    usagePerCustomer: 1,
    startDate: '',
    endDate: '',
    products: '',
    cities: '',
    channel: 'A'
  },
  {
    id: 3,
    eName: 'Potato',
    aName: '',
    type: '',
    discountType: '',
    status: 'inactive',
    brandName: '',
    user: '',
    quantity: 1,
    percentageAmount: 1,
    minimumOrder: 1,
    maximumScope: 1,
    usagePerCustomer: 1,
    startDate: '',
    endDate: '',
    products: '',
    cities: '',
    channel: 'A'
  },
  {
    id: 4,
    eName: 'Volleyball',
    aName: '',
    type: '',
    discountType: '',
    status: 'active',
    brandName: '',
    user: '',
    quantity: 1,
    percentageAmount: 1,
    minimumOrder: 1,
    maximumScope: 1,
    usagePerCustomer: 1,
    startDate: '',
    endDate: '',
    products: '',
    cities: '',
    channel: 'A'
  },
  {
    id: 5,
    eName: 'Football',
    aName: '',
    type: '',
    discountType: '',
    status: 'inactive',
    brandName: '',
    user: '',
    quantity: 1,
    percentageAmount: 1,
    minimumOrder: 1,
    maximumScope: 1,
    usagePerCustomer: 1,
    startDate: '',
    endDate: '',
    products: '',
    cities: '',
    channel: 'A'
  },
  {
    id: 6,
    eName: 'Table Tennis',
    aName: '',
    type: '',
    discountType: '',
    status: 'active',
    brandName: '',
    user: '',
    quantity: 1,
    percentageAmount: 1,
    minimumOrder: 1,
    maximumScope: 1,
    usagePerCustomer: 1,
    startDate: '',
    endDate: '',
    products: '',
    cities: '',
    channel: 'A'
  },
  {
    id: 7,
    eName: 'Apple',
    aName: '',
    type: '',
    discountType: '',
    status: 'inactive',
    brandName: '',
    user: '',
    quantity: 1,
    percentageAmount: 1,
    minimumOrder: 1,
    maximumScope: 1,
    usagePerCustomer: 1,
    startDate: '',
    endDate: '',
    products: '',
    cities: '',
    channel: 'A'
  }
]

mock.onGet('/apps/promoCodes/list').reply(() => {
  return [
    200,
    {
      promoCodes: promoCodes
    }
  ]
})
