// ** React Imports
import { useState, forwardRef } from 'react'

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

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const AddPromoCde = () => {
  // ** States
  const [channel, setChannel] = useState<string[]>([])
  const [promoCodeType, setPromoCodeType] = useState<string>('')
  const [discountType, setDiscountType] = useState<string>('')
  const [product, setProduct] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [startDate, seStartDate] = useState<DateType>(null)
  const [finishDate, setFinishDate] = useState<DateType>(null)

  const handleTypeChange = (e: SelectChangeEvent) => {
    setPromoCodeType(e.target.value)
  }
  const handleProductChange = (e: SelectChangeEvent) => {
    setProduct(e.target.value)
  }
  const handleCityChange = (e: SelectChangeEvent) => {
    setCity(e.target.value)
  }
  const handleDiscountTypeChange = (e: SelectChangeEvent) => {
    setDiscountType(e.target.value)
  }
  const handleChannelChange = (e: SelectChangeEvent<string[]>) => {
    setChannel(e.target.value as string[])
  }

  const CustomInput = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Start Date' autoComplete='off' />
  })

  const CustomInput1 = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Finish Date' autoComplete='off' />
  })

  return (
    <DatePickerWrapper className='match-height'>
      <Card>
        <CardHeader title='ADD PROMOCODE' />
        <Divider sx={{ m: '0 !important' }} />
        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Enter Promo Name With English' placeholder='please insert product name' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Enter Promo Name With Arabic' placeholder='please insert product name' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='select-type'>Promo Code Types</InputLabel>
                  <Select
                    value={promoCodeType}
                    onChange={handleTypeChange}
                    label='Types'
                    defaultValue=''
                    id='type-select'
                    labelId='select-type'
                  >
                    <MenuItem value=''>Select Types</MenuItem>
                    <MenuItem value='percentage'>Percentage</MenuItem>
                    <MenuItem value='amount'>Amount</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='discount-select'>Discount Types</InputLabel>
                  <Select
                    value={discountType}
                    onChange={handleDiscountTypeChange}
                    label='DiscountType'
                    defaultValue=''
                    id='select-discount'
                    labelId='discount-select'
                  >
                    <MenuItem value=''>Select Discount Types</MenuItem>
                    <MenuItem value='before VAT '>Before VAT </MenuItem>
                    <MenuItem value='after VAT'>After VAT</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth type='number' label='Enter Percentage Amount' placeholder='0' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField type='number' fullWidth label='Minimum Order ' placeholder='0 ' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField type='number' fullWidth label='Quantity' placeholder='0' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='select-channel'>Select Channel</InputLabel>
                  <Select
                    multiple
                    value={channel}
                    onChange={handleChannelChange}
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
                <TextField fullWidth label='Brand Name' placeholder='brand name' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField type='number' fullWidth label='Maximum Scope of Promo Code ' placeholder='0' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField type='number' fullWidth label='Usage Per Customer ' placeholder='0' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='User' placeholder='please insert user name' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  selected={startDate}
                  showYearDropdown
                  showMonthDropdown
                  id='form-layouts-tabs-date'
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInput />}
                  onChange={(startDate: Date) => seStartDate(startDate)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  selected={finishDate}
                  showYearDropdown
                  showMonthDropdown
                  id='form-layouts-tabs-date'
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInput1 />}
                  onChange={(finishDate: Date) => setFinishDate(finishDate)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='product-select'>Select Product</InputLabel>
                  <Select
                    value={product}
                    onChange={handleProductChange}
                    label='Product'
                    defaultValue=''
                    id='select-product'
                    labelId='product-select'
                  >
                    <MenuItem value=''>Select Products</MenuItem>
                    <MenuItem value='cooking essential '>Cooking Essential</MenuItem>
                    <MenuItem value='banner'>Banner</MenuItem>
                    <MenuItem value='potato '>Potato </MenuItem>
                    <MenuItem value='volleyball'>VolleyBall </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='city-select'>Select City</InputLabel>
                  <Select
                    value={city}
                    onChange={handleCityChange}
                    label='City'
                    defaultValue=''
                    id='select-city'
                    labelId='city-select'
                  >
                    <MenuItem value=''>Select Cities</MenuItem>
                    <MenuItem value='riyadh '>Riyadh </MenuItem>
                    <MenuItem value='jeddah'>Jeddah</MenuItem>
                    <MenuItem value='dammam'>Dammam</MenuItem>
                    <MenuItem value='mecca'>Mecca</MenuItem>
                    <MenuItem value='medina'>Medina</MenuItem>
                    <MenuItem value='taif'>Taif</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Divider />
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
    </DatePickerWrapper>
  )
}

export default AddPromoCde
