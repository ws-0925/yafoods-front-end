// ** React Imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

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

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** import redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'

import { editProduct, getProduct } from 'src/store/apps/products'

const EditProduct = () => {
  // ** States
  const [name, setName] = useState<string>('')
  const [nameAr, setNameAr] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [descriptionAr, setDescriptionAr] = useState<string>('')
  const [productCategoryId, setProductCategoryId] = useState<string>('')
  const [productParentCategoryId, setProductParentCategoryId] = useState<string>('')
  const [status, setStatus] = useState<string>('')

  const router = useRouter()
  const id: any = router.query.id
  const dispatch = useDispatch<AppDispatch>()

  const product = useSelector((state: RootState) => state.products.product)
  useEffect(() => {
    dispatch(getProduct(id))
    setName(product.name)
    setDescription(product.description)
    setStatus(product.status)
  }, [dispatch, id, product.description, product.name, product.status])

  const handleStatusChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const productData = {
      name: [
        {
          locale: 'en',
          value: name
        },
        {
          locale: 'ar',
          value: nameAr
        }
      ],
      description: [
        {
          locale: 'en',
          value: description
        },
        {
          locale: 'ar',
          value: descriptionAr
        }
      ],
      status: status,
      product_category_id: productCategoryId,
      product_parent_category_id: productParentCategoryId
    }
    dispatch(editProduct({ id, productData })).then(res => {
      res.payload !== undefined ? toast.success(res.payload.message) : toast.error('Internal Server Error')
    })
  }

  return (
    <DropzoneWrapper>
      <Card>
        <CardHeader title='ADD PRODUCT' />
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
                  onChange={(e: any) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Product Name With Arabic'
                  placeholder=''
                  value={nameAr}
                  onChange={(e: any) => setNameAr(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label='Product Description With English'
                  placeholder=''
                  value={description}
                  onChange={(e: any) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label='Product Description With Arabic'
                  placeholder=''
                  value={descriptionAr}
                  onChange={(e: any) => setDescriptionAr(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 15, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ fontSize: '15px', pb: 2 }}>Product Category</Box>
                  <ListBox />
                </Box>
              </Grid> */}
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
                  type='number'
                  label='Product Category Id'
                  placeholder=''
                  value={productCategoryId}
                  onChange={(e: any) => setProductCategoryId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='number'
                  label='Product Parent Category Id'
                  placeholder=''
                  value={productParentCategoryId}
                  onChange={(e: any) => setProductParentCategoryId(e.target.value)}
                />
              </Grid>
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

export default EditProduct
