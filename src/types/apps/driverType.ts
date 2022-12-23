export type VehicleCategoryType = {
  id: number
  eName: string
  aName: string
  status: string
}

export type VehiclesType = {
  id: number
  eName: string
  aName: string
  status: string
}

export type VehiclesDriverType = {
  id: number
  name: {
    firstName: string
    lastName: string
  }
  email: string
  mobile: string
  gender: string
  password: string
  confirmPassword: string
  vehicles: string
  status: string
}
