export type UserLogsType = {
  id: number
  name: string
  mobileNumber: string
  ipAddress: string
  createdAt: string
}

export type AdminLogsType = {
  id: number
  name: string
  ipAddress: string
  createdAt: string
  mobileNumber: string
}

export type DeleteUserLogsType = {
  id: number
  name: string
  ipAddress: string
  deletedAt: string
  mobileNumber: string
}
