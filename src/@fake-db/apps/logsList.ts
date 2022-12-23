// ** Mock
import mock from 'src/@fake-db/mock'

// ** Type
import { UserLogsType } from 'src/types/apps/logsType'
import { AdminLogsType } from 'src/types/apps/logsType'
import { DeleteUserLogsType } from 'src/types/apps/logsType'

const users: UserLogsType[] = [
  {
    id: 1,
    name: 'jhon',
    mobileNumber: '123125125',
    ipAddress: '162.158.162.140',
    createdAt: '2022-12-13'
  },
  {
    id: 2,
    name: 'jack',
    mobileNumber: '123125125',
    ipAddress: '162.158.162.141',
    createdAt: '2022-12-1'
  },
  {
    id: 3,
    name: 'Alexandra',
    mobileNumber: '123125125',
    ipAddress: '162.158.162.10',
    createdAt: '2022-12-23'
  },
  {
    id: 4,
    name: 'Peter',
    mobileNumber: '123125125',
    ipAddress: '162.158.162.120',
    createdAt: '2022-12-11'
  },
  {
    id: 5,
    name: 'Dave',
    mobileNumber: '123125125',
    ipAddress: '162.158.162.80',
    createdAt: '2022-12-25'
  }
]

const admins: AdminLogsType[] = [
  {
    id: 1,
    name: 'jhon',
    mobileNumber: '123125125',
    ipAddress: '162.158.162.140',
    createdAt: '2022-12-13'
  },
  {
    id: 2,
    name: 'jack',
    mobileNumber: '123125125',
    ipAddress: '162.158.162.141',
    createdAt: '2022-12-1'
  },
  {
    id: 3,
    name: 'Alexandra',
    mobileNumber: '123125125',
    ipAddress: '162.158.162.10',
    createdAt: '2022-12-23'
  },
  {
    id: 4,
    name: 'Peter',
    mobileNumber: '123125125',
    ipAddress: '162.158.162.120',
    createdAt: '2022-12-11'
  },
  {
    id: 5,
    name: 'Dave',
    mobileNumber: '123125125',
    ipAddress: '162.158.162.80',
    createdAt: '2022-12-25'
  }
]

const deletedUsers: DeleteUserLogsType[] = [
  {
    id: 1,
    name: 'jhon',
    mobileNumber: '123125125',
    ipAddress: '162.158.162.140',
    deletedAt: '2022-12-13'
  },
  {
    id: 2,
    name: 'jack',
    mobileNumber: '123125125',
    ipAddress: '162.158.162.141',
    deletedAt: '2022-12-1'
  },
  {
    id: 3,
    name: 'Alexandra',
    mobileNumber: '123125125',
    ipAddress: '162.158.162.10',
    deletedAt: '2022-12-23'
  },
  {
    id: 4,
    name: 'Peter',
    mobileNumber: '123125125',
    ipAddress: '162.158.162.120',
    deletedAt: '2022-12-11'
  },
  {
    id: 5,
    name: 'Dave',
    mobileNumber: '123125125',
    ipAddress: '162.158.162.80',
    deletedAt: '2022-12-25'
  }
]

mock.onGet('/apps/logs/userLogs').reply(() => {
  return [
    200,
    {
      users: users
    }
  ]
})

mock.onGet('/apps/logs/adminLogs').reply(() => {
  return [
    200,
    {
      admins: admins
    }
  ]
})

mock.onGet('/apps/logs/deleteUserLogs').reply(() => {
  return [
    200,
    {
      deletedUsers: deletedUsers
    }
  ]
})
