// ** Mock
import mock from 'src/@fake-db/mock'

// ** Type
import { ChannelType } from 'src/types/apps/channelType'

const channels: ChannelType[] = [
  {
    id: 1,
    eName: 'A',
    status: 'active',
    aName: ''
  },
  {
    id: 2,
    eName: 'B',
    status: 'inactive',
    aName: ''
  },
  {
    id: 3,
    eName: 'C',
    status: 'active',
    aName: ''
  }
]

mock.onGet('/apps/channels/list').reply(() => {
  return [
    200,
    {
      channels: channels
    }
  ]
})
