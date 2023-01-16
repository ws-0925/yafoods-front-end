// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** import api
import api from 'src/utils/api'

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
import { Box } from '@mui/material'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import ListBox from './ListBox'

// ** import redux
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'

import { addProduct } from 'src/store/apps/products'

const AddProduct = () => {
  // ** States
  const [name, setName] = useState<string>('')
  const [nameAr, setNameAr] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [descriptionAr, setDescriptionAr] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [categoryList, setCategoryList] = useState<any>([])
  const [categories, setCategories] = useState<any>([])

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleStatusChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }

  useEffect(() => {
    api
      .get('api/backend/filter-categories?sub_category=true', {
        headers: {
          'accept-language': 'en'
        }
      })
      .then(res => {
        const categories = res.data.data
        let result: any[] = []
        categories.forEach((category: any) => {
          const sub = category.category.sub_categories
          const pid = category.category.id
          const sub_cate_name = sub.map((sub_cat: any) => ({
            name: sub_cat.translation.category_name,
            id: sub_cat.id,
            parent_id: pid,
            parent_name: category.category_name
          }))
          result = [...result, ...sub_cate_name]
        })
        setCategories(result)
      })
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const category = categoryList.map((item: any) => ({
      product_category_id: item.id,
      product_parent_category_id: item.parent_id
    }))
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
      category: category
    }

    dispatch(addProduct(productData)).then(res => {
      res.payload.response == undefined
        ? toast.success(res.payload.message)
        : toast.error(res.payload.response.data.errors[0])
      router.replace('/products/ManageProducts')
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
                  sx={{ direction: 'rtl' }}
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
                  sx={{ direction: 'rtl' }}
                  label='Product Description With Arabic'
                  placeholder=''
                  value={descriptionAr}
                  onChange={(e: any) => setDescriptionAr(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 15, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ fontSize: '15px', pb: 2 }}>Product Category</Box>
                  <ListBox
                    getCategory={(value: any) => {
                      setCategoryList(value)
                    }}
                    categories={categories}
                  />
                </Box>
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

export default AddProduct
