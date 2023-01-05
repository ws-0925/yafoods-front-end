// ** React Imports
import { useState } from 'react'
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
import { toast } from 'react-hot-toast'

// ** Demo Components Imports
import CategoryImageUploader from 'src/views/apps/CategoryImageUploader'
import CategoryWebImageUploader from 'src/views/apps/CategoryWebImageUploader'
import CategoryIconUploader from 'src/views/apps/CategoryIconUploader'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

import { editCategory } from 'src/store/apps/category'

import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'

const AddProduct = () => {
  // ** States

  const dispatch = useDispatch<AppDispatch>()
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

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value)
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

    const id = router.query.id
    const formData = new FormData()
    formData.append('category_name', JSON.stringify(category_name).slice(1, -1))
    formData.append('category_description', JSON.stringify(category_description).slice(1, -1))
    formData.append('status', status)
    formData.append('parent_id', parentId)
    formData.append('image', images[0])
    webImages.length !== 0 ? formData.append('web_image', webImages[0]) : null
    icons.length !== 0 ? formData.append('icon', icons[0]) : null

    dispatch(editCategory({ formData, id })).then(res => {
      res.payload !== undefined ? toast.success(res.payload.message) : toast.error('internal server error')
    })
  }

  return (
    <DropzoneWrapper>
      <Card>
        <CardHeader title='Edit CATEGORY' />
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
                  label='Category Name With English'
                  placeholder=''
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
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
                  rows={3}
                  label='Description_Ar'
                  value={descriptionAr}
                  onChange={e => {
                    setDescriptionAr(e.target.value)
                  }}
                  placeholder=''
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='number'
                  label='Parent Id'
                  placeholder=''
                  value={parentId}
                  onChange={e => setParentId(e.target.value)}
                />
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
              <CategoryImageUploader
                getImage={(value: any) => {
                  setImages(value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <CategoryWebImageUploader
                getImage={(value: any) => {
                  setWebImages(value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
