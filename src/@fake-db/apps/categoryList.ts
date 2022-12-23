// ** Mock
import mock from 'src/@fake-db/mock'

// ** Type
import { CategoryType } from 'src/types/apps/categoryType'

const categories: CategoryType[] = [
  {
    id: 1,
    eName: 'Cooking Essentials',
    aName: '',
    parentCategory: 'Cooking Essentials',
    description: '',
    image: '',
    status: 'active'
  },
  {
    id: 2,
    eName: 'Banner',
    aName: '',
    parentCategory: 'Fruits',
    description: '',
    image: '',
    status: 'active'
  },
  {
    id: 3,
    eName: 'Potato',
    aName: '',
    parentCategory: 'Vegetables',
    description: '',
    image: '',
    status: 'inactive'
  },
  {
    id: 4,
    eName: 'Volleyball',
    aName: '',
    parentCategory: 'Sport',
    description: '',
    image: '',
    status: 'active'
  },
  {
    id: 5,
    eName: 'Football',
    aName: '',
    parentCategory: 'Sport',
    description: '',
    image: '',
    status: 'inactive'
  },
  {
    id: 6,
    eName: 'Table Tennis',
    aName: '',
    parentCategory: 'Sport',
    description: '',
    image: '',
    status: 'active'
  },
  {
    id: 7,
    eName: 'Apple',
    aName: '',
    parentCategory: 'Fruits',
    description: '',
    image: '',
    status: 'inactive'
  }
]

mock.onGet('/apps/categories/list').reply(() => {
  return [
    200,
    {
      categories: categories
    }
  ]
})
