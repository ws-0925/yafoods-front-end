export type ProductType = {
  id: number
  name: string
  locale: any
  image: string
  description: string
  product_id: {
    id: number
    product_sort: number
    status: number
  }
}

export type ProductVariantType = {
  id: number
  eName: string
  aName: string
  productCategory: string
  status: string
  image: string
  eDescription: string
  aDescription: string
  barCode: string
  eUnit: string
  aUnit: string
  quantity: number
  price: number
  vat: number
  channel: string
  similarProduct: string
}
