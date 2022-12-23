// ** React Imports
import { useState } from 'react'

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

// ** Demo Components Imports
import FileUploaderMultiple from '../../views/apps/FileUploaderMultiple'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

const AddProduct = () => {
  // ** States
  const [status, setStatus] = useState<string>('')

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value)
  }

  return (
    <DropzoneWrapper>
      <Card>
        <CardHeader title='ADD CATEGORY' />
        <Divider sx={{ m: '0 !important' }} />
        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Category Name With English' placeholder='' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Category Name With Arabic' placeholder='' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='status-select'>Select Parent Category</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-parent-category'
                    label='Select Parent Category'
                    labelId='parent-category-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Parent Category' }}
                  >
                    <MenuItem value=''>Select Parent Category</MenuItem>
                    <MenuItem value='cooking essential '>Cooking Essential</MenuItem>
                    <MenuItem value='banner'>Banner</MenuItem>
                    <MenuItem value='potato '>Potato </MenuItem>
                    <MenuItem value='volleyball'>VolleyBall </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField fullWidth multiline label='Description' placeholder='' />
              </Grid>
            </Grid>
            <Divider />
            <Grid item xs={12}>
              <FileUploaderMultiple />
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <CardActions>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              Submit
            </Button>
            <Button type='reset' size='large' color='secondary' variant='outlined'>
              Reset
            </Button>
          </CardActions>
        </form>
      </Card>
    </DropzoneWrapper>
  )
}

export default AddProduct
