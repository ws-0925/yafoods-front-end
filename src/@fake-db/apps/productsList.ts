// ** Mock
import mock from 'src/@fake-db/mock'

// ** Type
import { SimilarProductType } from 'src/types/apps/productType'

const products: SimilarProductType[] = [
  {
    id: 1,
    eName: 'Cooking Essentials',
    aName: '',
    productCategory: 'Cooking Essentials',
    status: 'active',
    image: '',
    eDescription: '',
    aDescription: '',
    barCode: '',
    eUnit: '',
    aUnit: '',
    quantity: 1,
    price: 1,
    vat: 1,
    channel: 'A',
    similarProduct: 'cooking'
  },
  {
    id: 2,
    eName: 'Banner',
    aName: '',
    productCategory: 'Fruits',
    status: 'active',
    image: '',
    eDescription: '',
    aDescription: '',
    barCode: '',
    eUnit: '',
    aUnit: '',
    quantity: 1,
    price: 1,
    vat: 1,
    channel: 'A',
    similarProduct: 'bann'
  },
  {
    id: 3,
    eName: 'Potato',
    aName: '',
    productCategory: 'Fruits',
    status: 'active',
    image: '',
    eDescription: '',
    aDescription: '',
    barCode: '',
    eUnit: '',
    aUnit: '',
    quantity: 1,
    price: 1,
    vat: 1,
    channel: 'A',
    similarProduct: 'suit potato'
  },
  {
    id: 4,
    eName: 'Volleyball',
    aName: '',
    productCategory: 'Sport',
    status: 'active',
    image: '',
    eDescription: '',
    aDescription: '',
    barCode: '',
    eUnit: '',
    aUnit: '',
    quantity: 1,
    price: 1,
    vat: 1,
    channel: 'B',
    similarProduct: 'football'
  },
  {
    id: 5,
    eName: 'Football',
    aName: '',
    productCategory: 'Sport',
    status: 'inactive',
    image: '',
    eDescription: '',
    aDescription: '',
    barCode: '',
    eUnit: '',
    aUnit: '',
    quantity: 1,
    price: 1,
    vat: 1,
    channel: 'C',
    similarProduct: 'basket ball'
  },
  {
    id: 6,
    eName: 'Table Tennis',
    aName: '',
    productCategory: 'Sport',
    status: 'active',
    image: '',
    eDescription: '',
    aDescription: '',
    barCode: '',
    eUnit: '',
    aUnit: '',
    quantity: 1,
    price: 1,
    vat: 1,
    channel: 'B',
    similarProduct: 'tennis'
  },
  {
    id: 7,
    eName: 'Apple',
    aName: '',
    productCategory: 'Fruits',
    status: 'inactive',
    image: '',
    eDescription: '',
    aDescription: '',
    barCode: '',
    eUnit: '',
    aUnit: '',
    quantity: 1,
    price: 1,
    vat: 1,
    channel: 'A',
    similarProduct: 'pear'
  }
]

mock.onGet('/apps/products/list').reply(() => {
  return [
    200,
    {
      products: products
    }
  ]
})
