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
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Box } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Demo Components Imports
import FileUploader from '../../views/apps/FileUploader'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

const AddProduct = () => {
  // ** States
  const [language, setLanguage] = useState<string[]>([])
  const [status, setStatus] = useState<string>('')

  // Handle Select
  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }

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
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-multiple-select-label'>Product Category</InputLabel>
                  <Select
                    multiple
                    value={language}
                    onChange={handleSelectChange}
                    id='form-layouts-separator-multiple-select'
                    labelId='form-layouts-separator-multiple-select-label'
                    input={<OutlinedInput label='productCategory' id='select-multiple-language' />}
                  >
                    <MenuItem value='cooking essentials'>Cooking Essentials</MenuItem>
                    <MenuItem value='fruits'>Fruits</MenuItem>
                    <MenuItem value='sport'>Sport</MenuItem>
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
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Product Description With English' placeholder='' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Product Description With Arabic' placeholder='' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Product Unit With English' placeholder='' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Barcode' placeholder='' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField type='number' fullWidth label='BarCode' placeholder='0' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField type='number' fullWidth label='Quantity' placeholder='0' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField type='number' fullWidth label='Price' placeholder='0' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField type='number' fullWidth label='Price VAT' placeholder='0' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='select-channel'>Select Channel</InputLabel>
                  <Select
                    multiple
                    value={language}
                    onChange={handleSelectChange}
                    id='select-channel'
                    labelId='select-channel'
                    input={<OutlinedInput label='Channels' id='select-channel' />}
                  >
                    <MenuItem value='a'>A</MenuItem>
                    <MenuItem value='b'>B</MenuItem>
                    <MenuItem value='c'>C</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <Box>
                    <FormControlLabel
                      label='Is_Similar_Product?'
                      control={<Checkbox defaultChecked name='color-info' color='info' />}
                    />
                  </Box>
                </FormControl>
              </Grid>
            </Grid>
            <Divider />
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
