export type OrderType = {
  id: number
  name: string
  total: number
  avatar: string
  service: string
  orderDate: string
  endDate: string
  address: string
  company: string
  city: string
  contact: string
  avatarColor?: string
  issuedDate: string
  companyEmail: string
  balance: string | number
  orderStatus: string
  source: string
}

export type BillType = {
  name: string
  email: string
  mobile: string
}

export type deliverOrderType = {
  transactionId: string
  amount: number
  orderDate: string
  deliverDate: string
  deliverTime: string
  source: string
}

export type SingleOrderType = {
  order: OrderType
  billDetails: BillType
  deliverOrder: deliverOrderType
}
