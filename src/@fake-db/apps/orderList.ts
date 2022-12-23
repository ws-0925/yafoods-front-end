// ** Mock
import mock from 'src/@fake-db/mock'

// ** Type
import { OrderType } from 'src/types/apps/orderType'

const now = new Date()
const currentMonth = now.toLocaleString('default', { month: 'short' })

const orders: OrderType[] = [
  {
    id: 4987,
    issuedDate: `13 ${currentMonth} ${now.getFullYear()}`,
    address: '7777 Mendez Plains',
    company: 'Hall-Robbins PLC',
    companyEmail: 'don85@johnson.com',
    city: 'USA',
    contact: '(616) 865-4180',
    name: 'Jordan Stevenson',
    service: 'Software Development',
    total: 3428,
    avatar: '',
    avatarColor: 'primary',
    orderStatus: 'picked',
    balance: '$724',
    orderDate: '2022-12-1',
    endDate: '2022-12-10',
    source: 'android'
  },
  {
    id: 4988,
    issuedDate: `17 ${currentMonth} ${now.getFullYear()}`,
    address: '04033 Wesley Wall Apt. 961',
    company: 'Mccann LLC and Sons',
    companyEmail: 'brenda49@taylor.info',
    city: 'Haiti',
    contact: '(226) 204-8287',
    name: 'Stephanie Burns',
    service: 'UI/UX Design & Development',
    total: 5219,
    avatar: '/images/avatars/1.png',
    orderStatus: 'returned',
    balance: 0,
    orderDate: '2022-12-1',
    endDate: '2022-12-15',
    source: 'android'
  },
  {
    id: 4989,
    issuedDate: `19 ${currentMonth} ${now.getFullYear()}`,
    address: '5345 Robert Squares',
    company: 'Leonard-Garcia and Sons',
    companyEmail: 'smithtiffany@powers.com',
    city: 'Denmark',
    contact: '(955) 676-1076',
    name: 'Tony Herrera',
    service: 'Unlimited Extended License',
    total: 3719,
    avatar: '/images/avatars/2.png',
    orderStatus: 'canceled',
    balance: 0,
    orderDate: '2022-12-11',
    endDate: '2022-12-20',
    source: 'android'
  },
  {
    id: 4990,
    issuedDate: `06 ${currentMonth} ${now.getFullYear()}`,
    address: '19022 Clark Parks Suite 149',
    company: 'Smith, Miller and Henry LLC',
    companyEmail: 'mejiageorge@lee-perez.com',
    city: 'Cambodia',
    contact: '(832) 323-6914',
    name: 'Kevin Patton',
    service: 'Software Development',
    total: 4749,
    avatar: '/images/avatars/3.png',
    orderStatus: 'completed',
    balance: 0,
    orderDate: '2022-12-1',
    endDate: '2022-12-31',
    source: 'ios'
  },
  {
    id: 4991,
    issuedDate: `08 ${currentMonth} ${now.getFullYear()}`,
    address: '8534 Saunders Hill Apt. 583',
    company: 'Garcia-Cameron and Sons',
    companyEmail: 'brandon07@pierce.com',
    city: 'Martinique',
    contact: '(970) 982-3353',
    name: 'Mrs. Julie Donovan MD',
    service: 'UI/UX Design & Development',
    total: 4056,
    avatar: '/images/avatars/4.png',
    orderStatus: 'confirmed',
    balance: '$815',
    orderDate: '2022-12-15',
    endDate: '2022-12-25',
    source: 'android'
  },
  {
    id: 4992,
    issuedDate: `26 ${currentMonth} ${now.getFullYear()}`,
    address: '661 Perez Run Apt. 778',
    company: 'Burnett-Young PLC',
    companyEmail: 'guerrerobrandy@beasley-harper.com',
    city: 'Botswana',
    contact: '(511) 938-9617',
    name: 'Amanda Phillips',
    service: 'UI/UX Design & Development',
    total: 2771,
    avatar: '',
    avatarColor: 'secondary',
    orderStatus: 'picked',
    balance: 0,
    orderDate: '2022-12-5',
    endDate: '2022-12-20',
    source: 'ios'
  },
  {
    id: 4993,
    issuedDate: `17 ${currentMonth} ${now.getFullYear()}`,
    address: '074 Long Union',
    company: 'Wilson-Lee LLC',
    companyEmail: 'williamshenry@moon-smith.com',
    city: 'Montserrat',
    contact: '(504) 859-2893',
    name: 'Christina Collier',
    service: 'UI/UX Design & Development',
    total: 2713,
    avatar: '',
    avatarColor: 'success',
    orderStatus: 'confirmed',
    balance: '$407',
    orderDate: '2022-12-21',
    endDate: '2022-12-31',
    source: 'ios'
  }
]

mock.onGet('/apps/orders/list').reply(() => {
  return [
    200,
    {
      orders: orders
    }
  ]
})
