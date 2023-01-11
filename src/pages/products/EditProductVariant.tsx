// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { toast } from 'react-hot-toast'

// ** Demo Components Imports
import VariantProductFileUploader from '../../views/apps/VariantProductFileUploader'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { useRouter } from 'next/router'

import { getAllProducts, editProductVariant, getVariantProduct } from 'src/store/apps/products'

const EditProductVariant = () => {
  // ** States
  const [product, setProduct] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [nameAr, setNameAr] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [descriptionAr, setDescriptionAr] = useState<string>('')
  const [uintId, setUnitId] = useState<string>('')
  const [barCode, setBarCode] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [vatPrice, setVatPrice] = useState<string>('')
  const [limitPerOrder, setLimitPerOrder] = useState<string>('')
  const [image, setImage] = useState<string>('')

  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()
  const id: any = router.query.id

  const products = useSelector((state: RootState) => state.products.products)
  const variantProduct = useSelector((state: RootState) => state.products.variantProduct)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  useEffect(() => {
    dispatch(getVariantProduct(id))
    setName(variantProduct.name)
    setDescription(variantProduct.description)
    setProduct(variantProduct.product_id)
    setStatus(variantProduct.status)
    setUnitId(variantProduct.unit_id)
    setBarCode(variantProduct.bar_code)
    setQuantity(variantProduct.qty)
    setPrice(variantProduct.price)
    setVatPrice(variantProduct.vat_price)
    setLimitPerOrder(variantProduct.limit_per_order)
  }, [
    dispatch,
    id,
    variantProduct.bar_code,
    variantProduct.description,
    variantProduct.limit_per_order,
    variantProduct.name,
    variantProduct.price,
    variantProduct.product_id,
    variantProduct.qty,
    variantProduct.status,
    variantProduct.unit_id,
    variantProduct.vat_price
  ])

  // Handle Select
  const handleProductChange = (e: any) => {
    setProduct(e.target.value)
  }

  const handleStatusChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const product_name = [
      {
        locale: 'en',
        value: name
      },
      {
        locale: 'ar',
        value: nameAr
      }
    ]
    const product_description = [
      {
        locale: 'en',
        value: description
      },
      {
        locale: 'ar',
        value: descriptionAr
      }
    ]
    const formData = new FormData()
    formData.append('name', JSON.stringify(product_name).slice(1, -1))
    formData.append('description', JSON.stringify(product_description).slice(1, -1))
    formData.append('barcode', barCode)
    formData.append('limit_per_order', limitPerOrder)
    formData.append('price', price)
    formData.append('product_id', product)
    formData.append('status', status)
    formData.append('vat_price', vatPrice)
    formData.append('unit_id', uintId)
    formData.append('qty', quantity)
    formData.append('image', image[0])
    dispatch(editProductVariant({ formData, id })).then(res => {
      res.payload !== undefined ? toast.success(res.payload.message) : toast.error('Internal Server Error')
    })
  }

  return (
    <DropzoneWrapper>
      <Card>
        <CardHeader title='Edit PRODUCT VARIANT' />
        <Divider sx={{ m: '0 !important' }} />
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Product Name With English'
                  placeholder=''
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Product Name With Arabic'
                  placeholder=''
                  value={nameAr}
                  onChange={e => {
                    setNameAr(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label='Product Description With English'
                  placeholder=''
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label='Product Description With Arabic'
                  placeholder=''
                  value={descriptionAr}
                  onChange={e => {
                    setDescriptionAr(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='city_id'>Select Product</InputLabel>
                  <Select
                    fullWidth
                    value={product}
                    id='select-product'
                    label='Select Product'
                    labelId='product-select'
                    onChange={handleProductChange}
                    inputProps={{ placeholder: 'Select Product' }}
                  >
                    <MenuItem value=''>Select Product</MenuItem>
                    {products.map((item: any) => (
                      <MenuItem value={item.product_id.id} key={item.product_id.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={handleStatusChange}
                    label='Status'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                  >
                    <MenuItem value=''>Select Status</MenuItem>
                    <MenuItem value='1'>Active</MenuItem>
                    <MenuItem value='0'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Product Unit Id'
                  placeholder=''
                  value={uintId}
                  onChange={e => {
                    setUnitId(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='BarCode'
                  placeholder='0'
                  value={barCode}
                  onChange={e => setBarCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type='number'
                  fullWidth
                  label='Quantity'
                  placeholder='0'
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type='number'
                  fullWidth
                  label='Price'
                  placeholder='0'
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type='number'
                  fullWidth
                  label='VAT Price'
                  placeholder='0'
                  value={vatPrice}
                  onChange={e => setVatPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                <TextField
                  type='number'
                  fullWidth
                  label='Limit Per Order'
                  placeholder='0'
                  value={limitPerOrder}
                  onChange={e => setLimitPerOrder(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <VariantProductFileUploader
                getImage={(value: any) => {
                  setImage(value)
                }}
              />
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <CardActions>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              Submit
            </Button>
            <Button type='reset' size='large' color='secondary' variant='outlined' onClick={() => router.back()}>
              Back
            </Button>
          </CardActions>
        </form>
      </Card>
    </DropzoneWrapper>
  )
}

export default EditProductVariant
