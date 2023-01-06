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
  name: string
  description: string
  locale: string
  product_variant_id: {
    id: number
    product_id: number
    image: string
    barcode: string
    unit_id: string
    qty: number
    price: number
    vat_price: number
    limit_per_order: string
    status: number
  }
}

export type SortProductType = {
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
