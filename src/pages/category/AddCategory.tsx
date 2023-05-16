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
import Select from '@mui/material/Select'

// import Backdrop from '@mui/material/Backdrop'
// import CircularProgress from '@mui/material/CircularProgress'

// ** Demo Components Imports
import CategoryImageUploader from 'src/views/apps/CategoryImageUploader'
import CategoryWebImageUploader from 'src/views/apps/CategoryWebImageUploader'
import CategoryIconUploader from 'src/views/apps/CategoryIconUploader'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import { toast } from 'react-hot-toast'
import { addCategory } from 'src/store/apps/category'

import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { useSelector } from 'react-redux'
import { getParentCategories } from 'src/store/apps/category'

// ** import Backdrop
import Loading from 'src/utils/backdrop'

const AddProduct = () => {
  // ** States

  const dispatch = useDispatch<AppDispatch>()

  const [loading, setLoading] = useState(false)

  const [status, setStatus] = useState<string>('')
  const [categoryName, setCategoryName] = useState<string>('')
  const [categoryNameAr, setCategoryNameAr] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [descriptionAr, setDescriptionAr] = useState<string>('')
  const [parentId, setParentId] = useState<string>('')
  const [images, setImages] = useState<File[]>([])
  const [webImages, setWebImages] = useState<File[]>([])
  const [icons, setIcons] = useState<File[]>([])

  const router = useRouter()

  const parentCategories = useSelector((state: RootState) => state.category.parentCategories)
  useEffect(() => {
    dispatch(getParentCategories())
  }, [dispatch])

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value)
  }

  const handleCategoryChange = (e: any) => {
    setParentId(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const category_name = [
      {
        locale: 'en',
        value: categoryName
      },
      {
        locale: 'ar',
        value: categoryNameAr
      }
    ]
    const category_description = [
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
    formData.append('category_name', JSON.stringify(category_name).slice(1, -1))
    formData.append('category_description', JSON.stringify(category_description).slice(1, -1))
    formData.append('status', status)
    formData.append('parent_id', parentId)
    formData.append('image', images[0])
    webImages.length !== 0 ? formData.append('web_image', webImages[0]) : null
    icons.length !== 0 ? formData.append('icon', icons[0]) : null

    setLoading(true)

    dispatch(addCategory(formData)).then(res => {
      res.payload.response == undefined
        ? toast.success(res.payload.message)
        : toast.error(res.payload.response.data.errors[0])
      router.replace('/category/ManageCategory')
    })
  }

  return (
    <DropzoneWrapper>
      <Loading open={loading} />
      <Card>
        <CardHeader title='ADD CATEGORY' />
        <Divider sx={{ m: '0 !important' }} />
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  value={categoryName}
                  onChange={e => {
                    setCategoryName(e.target.value)
                  }}
                  label='Category Name'
                  placeholder=''
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  sx={{ direction: 'rtl' }}
                  label='Category Name With Arabic'
                  placeholder=''
                  value={categoryNameAr}
                  onChange={e => setCategoryNameAr(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label='Description'
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
                  sx={{ direction: 'rtl' }}
                  rows={3}
                  label='Description With Arabic'
                  value={descriptionAr}
                  onChange={e => {
                    setDescriptionAr(e.target.value)
                  }}
                  placeholder=''
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='city_id'>Select Parent Category</InputLabel>
                  <Select
                    fullWidth
                    value={parentId}
                    id='select-parent-category'
                    label='Select Parent Category'
                    labelId='parent-category-select'
                    onChange={handleCategoryChange}
                    inputProps={{ placeholder: 'Select Parent Category' }}
                  >
                    <MenuItem value=''>Select Parent Category</MenuItem>
                    {parentCategories.map((category: any) => (
                      <MenuItem value={category.category_id} key={category.category_id}>
                        {category.category_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Status' }}
                  >
                    <MenuItem value=''>Select Status</MenuItem>
                    <MenuItem value='1'>Active</MenuItem>
                    <MenuItem value='0'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Divider />
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <InputLabel sx={{ p: 5, pl: 0 }}>Category Image</InputLabel>
              <CategoryImageUploader
                getImage={(value: any) => {
                  setImages(value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <InputLabel sx={{ p: 5, pl: 0 }}>Category Web Image</InputLabel>
              <CategoryWebImageUploader
                getImage={(value: any) => {
                  setWebImages(value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ p: 5, pl: 0 }}>Category Icon</InputLabel>
              <CategoryIconUploader
                getImage={(value: any) => {
                  setIcons(value)
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

export default AddProduct
