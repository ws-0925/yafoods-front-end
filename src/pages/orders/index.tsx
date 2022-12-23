// ** React Imports
import { useState, useEffect, MouseEvent, useCallback, forwardRef } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import { IconButton } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Actions Imports
import { fetchData } from 'src/store/apps/order'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/orders/TableHeader'
import { OrderType } from 'src/types/apps/orderType'

import DatePicker from 'react-datepicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import format from 'date-fns/format'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

interface viewDataType {
  totalOrders: number
  totalActiveOrders: number
  unAssignedOrders: number
  CanceledOrders: number
}

const viewData: viewDataType = {
  totalOrders: 37,
  totalActiveOrders: 25,
  unAssignedOrders: 37,
  CanceledOrders: 25
}

interface OrdersStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: OrderType
}

const ordersStatusList: OrdersStatusType = {
  confirmed: 'success',
  picked: 'secondary',
  completed: 'primary',
  canceled: 'warning',
  returned: 'info'
}

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

  const value = `${startDate}${endDate !== null ? endDate : ''}`

  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates

  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})

const OrderList = () => {
  // ** State
  const [status, setStatus] = useState<string>('')
  const [source, setSource] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [pageSize, setPageSize] = useState<number>(10)
  const [dates, setDates] = useState<Date[]>([])
  const [startDateRange, setStartDateRange] = useState<DateType>(null)
  const [endDateRange, setEndDateRange] = useState<DateType>(null)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const orders = useSelector((state: RootState) => state.order.orders)

  const handleStatusChange = useCallback(
    (e: SelectChangeEvent) => {
      setIsFirst(false)
      if (e.target.value == '') {
        setFilterData(orders)

        return
      }
      const data = orders.filter((item: { orderStatus: string }) => item.orderStatus == e.target.value)
      setFilterData(data)
      setStatus(e.target.value)
    },
    [orders]
  )

  const handleSourceChange = useCallback(
    (e: SelectChangeEvent) => {
      setIsFirst(false)
      if (e.target.value == '') {
        setFilterData(orders)

        return
      }
      const data = orders.filter((item: { source: string }) => item.source == e.target.value)
      setFilterData(data)
      setSource(e.target.value)
    },
    [orders]
  )

  const handleFilter = useCallback(
    (val: string) => {
      setValue(val)
      setIsFirst(false)
      if (val == '') {
        setFilterData(orders)

        return
      }
      let data: any = []
      data = orders.filter((item: { name: any }) => item.name.toLowerCase().search(val) != -1)
      setFilterData(data)
    },
    [orders]
  )
  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)

      setIsFirst(false)
      const startMilliSec = Date.parse(start)
      const endMilliSec = Date.parse(end)
      const data = orders.filter(
        (item: any) => Date.parse(item.orderDate) >= startMilliSec && Date.parse(item.endDate) <= endMilliSec
      )

      setFilterData(data)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  const RowOptions = ({ id }: { id: number | string }) => {
    console.log(id)

    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='mdi:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem component={Link} sx={{ '& svg': { mr: 2 } }} onClick={handleRowOptionsClose} href='/orders/view/'>
            <Icon icon='mdi:eye-outline' fontSize={20} />
            View
          </MenuItem>
          <MenuItem component={Link} onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }} href='/orders/edit/'>
            <Icon icon='mdi:pencil-outline' fontSize={20} />
            Edit
          </MenuItem>
        </Menu>
      </>
    )
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: 'OrderId',
      renderCell: ({ row }: CellType) => {
        const { id } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{id}</Box>
      }
    },
    {
      flex: 0.3,
      minWidth: 250,
      field: 'name',
      headerName: 'Customer',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.name}
          </Typography>
        )
      }
    },
    {
      flex: 0.3,
      minWidth: 250,
      field: 'orderDate',
      headerName: 'Order Date',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.orderDate}
          </Typography>
        )
      }
    },
    {
      flex: 0.3,
      minWidth: 250,
      field: 'source',
      headerName: 'Source',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.source}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.orderStatus}
            color={ordersStatusList[row.orderStatus]}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
    }
  ]

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {viewData && (
            <Grid container spacing={6}>
              <Grid item xs={12} md={3}>
                <Card
                  sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#16B1FF', height: '100%' }}
                >
                  <CardContent
                    sx={{ py: theme => `${theme.spacing(4.125)} !important`, display: 'flex', flexDirection: 'column' }}
                  >
                    <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                      Total Orders:
                    </Typography>
                    <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                      {viewData.totalOrders}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card
                  sx={{
                    border: 0,
                    boxShadow: 0,
                    color: 'common.white',
                    backgroundColor: '#3b3a7e',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <CardContent sx={{ py: theme => `${theme.spacing(4.125)} !important` }}>
                    <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                      Total Active Orders:
                    </Typography>
                    <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                      {viewData.totalActiveOrders}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card
                  sx={{
                    border: 0,
                    boxShadow: 0,
                    color: 'common.white',
                    backgroundColor: '#eda540',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <CardContent sx={{ py: theme => `${theme.spacing(4.125)} !important` }}>
                    <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                      Unassigned Orders:
                    </Typography>
                    <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                      {viewData.unAssignedOrders}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card
                  sx={{
                    border: 0,
                    boxShadow: 0,
                    color: 'common.white',
                    backgroundColor: '#d43b48',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <CardContent sx={{ py: theme => `${theme.spacing(4.125)} !important` }}>
                    <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                      Canceled Orders:
                    </Typography>
                    <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                      {viewData.CanceledOrders}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item sm={4} xs={12}>
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
                <Grid item sm={4} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='status-select'>Select Source</InputLabel>
                    <Select
                      fullWidth
                      value={source}
                      id='select-source'
                      label='Select Source'
                      labelId='source-select'
                      onChange={handleSourceChange}
                      inputProps={{ placeholder: 'Select Source' }}
                    >
                      <MenuItem value=''>Select Source</MenuItem>
                      <MenuItem value='android'>Android</MenuItem>
                      <MenuItem value='ios'>IOS</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id='date-range-picker-months'
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label='Order Date'
                        end={endDateRange as number | Date}
                        start={startDateRange as number | Date}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <TableHeader value={value} handleFilter={handleFilter} />
            <DataGrid
              autoHeight
              rows={isFirst ? orders : filterData}
              columns={columns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
              onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default OrderList
