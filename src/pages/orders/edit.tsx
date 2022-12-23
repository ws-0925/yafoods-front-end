import { useState, forwardRef, SyntheticEvent } from 'react'

// ** MUI Imports
import Grid, { GridProps } from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent, { CardContentProps } from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import { Button } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** import DatePicker
import DatePicker from 'react-datepicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Types
import { SingleOrderType } from 'src/types/apps/orderType'
import Repeater from 'src/@core/components/repeater'

interface data {
  data: SingleOrderType
}

const now = new Date()
const currentMonth = now.toLocaleString('default', { month: 'short' })

const data = {
  order: {
    id: 4987,
    issuedDate: `13 ${currentMonth} ${now.getFullYear()}`,
    address: '7777 Mendez Plains',
    company: 'Hall-Robbins PLC',
    companyEmail: 'don85@johnson.com',
    city: 'USA',
    contact: '(616) 865-4180',
    name: 'Jordan Stevenson',
    service: 'Software Development',
    total: 3428,
    avatar: '',
    avatarColor: 'primary',
    orderStatus: 'picked',
    balance: '$724',
    orderDate: `23 ${currentMonth} ${now.getFullYear()}`,
    source: 'android'
  },
  billDetails: {
    billTo: 'Tony Herrera',
    email: 'tony@herrera.com',
    mobile: '555-555-5555'
  },
  deliverOrder: {
    transactionId: 235302195898,
    amount: '10.00',
    orderDate: `23 ${currentMonth} ${now.getFullYear()}`,
    deliverDate: `23 ${currentMonth} ${now.getFullYear()}`,
    deliverTime: '10:00',
    source: 'android'
  }
}

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Deliver Date' autoComplete='off' />
})

const CustomInputTimeFrom = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Deliver Time From' autoComplete='off' />
})

const CustomInputTimeTo = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Deliver Time To' autoComplete='off' />
})

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const LogoImg = styled('img')(({ theme }) => ({
  maxWidth: '2.5rem',
  borderRadius: '50%',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '2.5rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '2rem'
  }
}))

const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(5.5),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(8)
  }
}))

const RepeatingContent = styled(Grid)<GridProps>(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.5rem',
    position: 'absolute'
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const InvoiceAction = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 0),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const EditOrder = () => {
  // ** Hook
  const [address, setAddress] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [count, setCount] = useState<number>(1)
  const [startDate, seStartDate] = useState<DateType>(null)
  const [timeFrom, setTimeFrom] = useState<DateType>(new Date())
  const [timeTo, setTimeTo] = useState<DateType>(new Date())

  const handleAddressChange = (event: SelectChangeEvent) => {
    setAddress(event.target.value)
  }

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value)
  }

  const deleteForm = (e: SyntheticEvent) => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }

  if (data) {
    return (
      <Box>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                    <LogoImg alt='logo' src='/images/logos/logo.png' />
                    <Typography variant='h6' sx={{ ml: 2, fontWeight: 700, lineHeight: 1.2 }}>
                      {themeConfig.templateName}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                  <Table sx={{ maxWidth: '350px' }}>
                    <TableBody>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='h6'>Order Number</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='h6'>{`#${data.order.id}`}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Date Issued:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data.order.issuedDate}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Date Due:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data.order.orderDate}</Typography>
                        </MUITableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
            </Grid>
          </CardContent>

          <Divider
            sx={{ mt: theme => `${theme.spacing(6.5)} !important`, mb: theme => `${theme.spacing(5.5)} !important` }}
          />

          <DatePickerWrapper>
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={2}>
                  Client :
                </Grid>
                <Grid item xs={12} sm={10}>
                  {data.order.name}
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography>Payment Type: </Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  Apple Pay
                </Grid>
                <Grid item xs={12} sm={2} sx={{ mt: 4 }}>
                  <Typography>Deliver Date: </Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
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
                <Grid item xs={12} sm={2} sx={{ mt: 4 }}>
                  <Typography>Deliver Time: </Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <DatePicker
                    showTimeSelect
                    selected={timeFrom}
                    timeIntervals={15}
                    showTimeSelectOnly
                    dateFormat='h:mm aa'
                    id='time-only-picker'
                    onChange={(date: Date) => setTimeFrom(date)}
                    customInput={<CustomInputTimeFrom />}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <DatePicker
                    showTimeSelect
                    selected={timeTo}
                    timeIntervals={15}
                    showTimeSelectOnly
                    dateFormat='h:mm aa'
                    id='time-only-picker'
                    onChange={(date: Date) => setTimeTo(date)}
                    customInput={<CustomInputTimeTo />}
                  />
                </Grid>
                <Grid item xs={12} sm={2} sx={{ mt: 4 }}>
                  <Typography>Address: </Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <FormControl fullWidth>
                    <InputLabel id='select-type'>Promo Code Types</InputLabel>
                    <Select
                      value={address}
                      onChange={handleAddressChange}
                      label='Types'
                      defaultValue=''
                      id='type-select'
                      labelId='select-type'
                    >
                      <MenuItem value=''>Select Address</MenuItem>
                      <MenuItem value='address_1'>Address1</MenuItem>
                      <MenuItem value='address_2'>Address2</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={2} sx={{ mt: 4 }}>
                  <Typography>Note:</Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField fullWidth multiline rows={4} label='Note' placeholder='' />
                </Grid>
                <Grid item xs={12} sm={2} sx={{ mt: 4 }}>
                  <Typography>Order Status:</Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <FormControl fullWidth>
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
                      <MenuItem value='confirmed'>Confirmed</MenuItem>
                      <MenuItem value='picked'>Picked</MenuItem>
                      <MenuItem value='completed'>Completed</MenuItem>
                      <MenuItem value='canceled'>Canceled</MenuItem>
                      <MenuItem value='returned'>Returned</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </DatePickerWrapper>

          <Divider sx={{ mt: theme => `${theme.spacing(6.5)} !important`, mb: '0 !important' }} />

          <RepeaterWrapper>
            <Repeater count={count}>
              {(i: number) => {
                const Tag = i === 0 ? Box : Collapse

                return (
                  <Tag key={i} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
                    <Grid container>
                      <RepeatingContent item xs={12}>
                        <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                          <Grid item lg={3} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 2 } }}>
                            <Typography
                              variant='subtitle2'
                              className='col-title'
                              sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                            >
                              Product
                            </Typography>
                            <Select fullWidth size='small' defaultValue='App Design'>
                              <MenuItem value='App Design'>App Design</MenuItem>
                              <MenuItem value='App Customization'>App Customization</MenuItem>
                              <MenuItem value='ABC Template'>ABC Template</MenuItem>
                              <MenuItem value='App Development'>App Development</MenuItem>
                            </Select>
                          </Grid>
                          <Grid item lg={3} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 2 } }}>
                            <Typography
                              variant='subtitle2'
                              className='col-title'
                              sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                            >
                              Variant
                            </Typography>
                            <Select fullWidth size='small' defaultValue='App Design'>
                              <MenuItem value='App Design'>App Design</MenuItem>
                              <MenuItem value='App Customization'>App Customization</MenuItem>
                              <MenuItem value='ABC Template'>ABC Template</MenuItem>
                              <MenuItem value='App Development'>App Development</MenuItem>
                            </Select>
                          </Grid>
                          <Grid item lg={2} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 2 } }}>
                            <Typography
                              variant='subtitle2'
                              className='col-title'
                              sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                            >
                              Unit Price
                            </Typography>
                            <TextField
                              size='small'
                              type='number'
                              placeholder='24'
                              defaultValue='24'
                              InputProps={{ inputProps: { min: 0 } }}
                            />
                          </Grid>
                          <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 2 } }}>
                            <Typography
                              variant='subtitle2'
                              className='col-title'
                              sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                            >
                              Quantity
                            </Typography>
                            <TextField
                              size='small'
                              type='number'
                              placeholder='1'
                              defaultValue='1'
                              InputProps={{ inputProps: { min: 0 } }}
                            />
                          </Grid>
                          <Grid item lg={2} md={1} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                            <Typography
                              variant='subtitle2'
                              className='col-title'
                              sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                            >
                              Total
                            </Typography>
                            <Typography variant='body2' sx={{ pt: 2 }}>
                              {' '}
                              SAR 24.00
                            </Typography>
                          </Grid>
                        </Grid>
                        <InvoiceAction>
                          <IconButton size='small' onClick={deleteForm}>
                            <Icon icon='mdi:close' fontSize={20} />
                          </IconButton>
                        </InvoiceAction>
                      </RepeatingContent>
                    </Grid>
                  </Tag>
                )
              }}
            </Repeater>

            <Grid container sx={{ mt: 4.75 }}>
              <Grid item xs={12} sx={{ px: 0 }}>
                <Button
                  size='small'
                  variant='contained'
                  onClick={() => setCount(count + 1)}
                  startIcon={<Icon icon='mdi:plus' fontSize={20} />}
                >
                  Add Item
                </Button>
              </Grid>
            </Grid>
          </RepeaterWrapper>

          <CardContent sx={{ pt: 8 }}>
            <Grid container>
              <Grid item xs={12} sm={7} lg={9} sx={{ order: { sm: 1, xs: 2 } }}></Grid>
              <Grid item xs={12} sm={5} lg={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
                <CalcWrapper>
                  <Typography variant='body2'>Total amount excluding VAT:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    SAR 1800
                  </Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>Grand Total:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    SAR 1770
                  </Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>Deliver fee:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    21 %
                  </Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>VAT(15%):</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    SAR 15.67
                  </Typography>
                </CalcWrapper>
                <Divider
                  sx={{ mt: theme => `${theme.spacing(5)} !important`, mb: theme => `${theme.spacing(3)} !important` }}
                />
                <CalcWrapper>
                  <Typography variant='body2'>Total Payable:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    SAR 1690
                  </Typography>
                </CalcWrapper>
                <FormControl>
                  <Box>
                    <FormControlLabel
                      control={<Checkbox defaultChecked name='color-info' color='info' />}
                      label='Apply Promocode'
                    />
                  </Box>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ mt: theme => `${theme.spacing(6.5)} !important`, mb: '0 !important' }} />
          <Box sx={{ display: 'flex', justifyContent: 'right', p: 5 }}>
            <Button size='small' variant='contained'>
              Save
            </Button>
          </Box>
        </Card>
        <Card sx={{ mt: 15 }}>
          <Box sx={{ p: 5 }}>
            <Typography variant='h5'>Order Logs</Typography>
          </Box>
          <Divider sx={{ mt: theme => `${theme.spacing(6.5)} !important`, mb: '0 !important' }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order Status</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Created at</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Confirmed</TableCell>
                  <TableCell>Jack</TableCell>
                  <TableCell>Android</TableCell>
                  <TableCell></TableCell>
                  <TableCell>2022-12-12</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    )
  } else {
    return null
  }
}

export default EditOrder
