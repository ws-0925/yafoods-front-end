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
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Demo Components Imports
import FileUploader from '../../views/apps/FileUploader'

// ** import ListBox
import ListBox from './ListBox'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import { Box } from '@mui/system'

const AddProduct = () => {
  // ** States
  const [status, setStatus] = useState<string>('')

  const handleStatusChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }

  return (
    <DropzoneWrapper>
      <Card>
        <CardHeader title='ADD PRODUCT' />
        <Divider sx={{ m: '0 !important' }} />
        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Product Name With English' placeholder='' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Product Name With Arabic' placeholder='' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth multiline rows={4} label='Product Description With English' placeholder='' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth multiline rows={4} label='Product Description With Arabic' placeholder='' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 15 }}>
                  <ListBox />
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
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FileUploader />
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
