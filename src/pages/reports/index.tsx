// ** React Imports
import { useState, forwardRef, useCallback } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { CardContent } from '@mui/material'
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Custom Table Components Imports
import { ReportType } from 'src/types/apps/reportType'
import format from 'date-fns/format'

interface CellType {
  row: ReportType
}

const reports = [
  {
    id: 1,
    startDate: '2022-12-1',
    endDate: '2022-12-31',
    status: 'picked',
    source: 'ios',
    city: 'Riyadh',
    area: 'aaa',
    counts: 1223
  },
  {
    id: 2,
    startDate: '2022-12-1',
    endDate: '2022-12-10',
    status: 'confirmed',
    source: 'android',
    city: 'Jeddah',
    area: 'bbb',
    counts: 2213
  },
  {
    id: 3,
    startDate: '2022-12-11',
    endDate: '2022-12-31',
    status: 'completed',
    source: 'ios',
    city: 'Mecca',
    area: 'ccc',
    counts: 4112
  },
  {
    id: 4,
    startDate: '2022-12-5',
    endDate: '2022-12-25',
    status: 'canceled',
    source: 'android',
    city: 'Dammam',
    area: 'aaa',
    counts: 1109
  },
  {
    id: 5,
    startDate: '2022-12-1',
    endDate: '2022-12-12',
    status: 'completed',
    source: 'android',
    city: 'Mecca',
    area: 'bbb',
    counts: 2111
  }
]

const ReportList = () => {
  // ** State
  const [status, setStatus] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [area, setArea] = useState<string>('')
  const [source, setSource] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [pageSize, setPageSize] = useState<number>(10)
  const [dates, setDates] = useState<Date[]>([])
  const [startDateRange, setStartDateRange] = useState<DateType>(null)
  const [endDateRange, setEndDateRange] = useState<DateType>(null)

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

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setIsFirst(false)
    if (e.target.value == '') {
      setFilterData(reports)

      return
    } else {
      const data = reports.filter((item: any) => item.status.toLowerCase() == e.target.value)
      setFilterData(data)
      setStatus(e.target.value)
    }
  }, [])

  const handleSourceChange = useCallback((e: SelectChangeEvent) => {
    setIsFirst(false)
    if (e.target.value == '') {
      setFilterData(reports)

      return
    } else {
      const data = reports.filter((item: any) => item.source.toLowerCase() == e.target.value)
      setFilterData(data)
      setSource(e.target.value)
    }
  }, [])

  const handleCityChange = useCallback((e: SelectChangeEvent) => {
    setIsFirst(false)
    if (e.target.value == '') {
      setFilterData(reports)

      return
    } else {
      const data = reports.filter((item: any) => item.city.toLowerCase() == e.target.value)
      setFilterData(data)
      setCity(e.target.value)
    }
  }, [])

  const handleAreaChange = useCallback((e: SelectChangeEvent) => {
    setIsFirst(false)
    if (e.target.value == '') {
      setFilterData(reports)

      return
    } else {
      const data = reports.filter((item: any) => item.area.toLowerCase() == e.target.value)
      setFilterData(data)
      setArea(e.target.value)
    }
  }, [])

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates

    // const date = Date.parse('2022-10-9')
    if (start !== null && end !== null) {
      setDates(dates)
      setIsFirst(false)
      const startMilliSec = Date.parse(start)
      const endMilliSec = Date.parse(end)
      const data = reports.filter(
        val => Date.parse(val.startDate) >= startMilliSec && Date.parse(val.endDate) <= endMilliSec
      )
      setFilterData(data)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: 'NO',
      renderCell: ({ row }: CellType) => {
        let index = 0
        for (let i = 0; i < reports.length; i++) {
          if (row.id == reports[i].id) {
            index = i + 1
          }
        }

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{index}</Box>
      }
    },
    {
      flex: 0.2,
      minWidth: 190,
      sortable: false,
      field: 'counts',
      headerName: 'Total Request',
      renderCell: ({ row }: CellType) => {
        const { counts } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{counts}</Box>
      }
    },
    {
      flex: 0.2,
      minWidth: 190,
      sortable: false,
      field: 'action',
      headerName: 'Action',
      renderCell: () => {
        return (
          <Button variant='contained' color='primary' sx={{ mr: 1 }}>
            Export To Excel
          </Button>
        )
      }
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <DatePickerWrapper>
            <CardContent>
              <Grid container spacing={6}>
                <Grid item sm={3} xs={12}>
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
                <Grid item sm={3} xs={12}>
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
                <Grid item sm={3} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='city-select'>Select City</InputLabel>
                    <Select
                      fullWidth
                      value={city}
                      id='select-city'
                      label='Select City'
                      labelId='city-select'
                      onChange={handleCityChange}
                      inputProps={{ placeholder: 'Select City' }}
                    >
                      <MenuItem value=''>Select City</MenuItem>
                      <MenuItem value='riyadh'>Riyadh</MenuItem>
                      <MenuItem value='dammam'>Dammam</MenuItem>
                      <MenuItem value='jeddah'>Jeddah</MenuItem>
                      <MenuItem value='mecca'>Mecca</MenuItem>
                      <MenuItem value='medina'>Medina</MenuItem>
                      <MenuItem value='taif'>Taif</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel id='area-select'>Select Area</InputLabel>
                    <Select
                      fullWidth
                      value={area}
                      id='select-area'
                      label='Select Area'
                      labelId='area-select'
                      onChange={handleAreaChange}
                      inputProps={{ placeholder: 'Select Area' }}
                    >
                      <MenuItem value=''>Select Area</MenuItem>
                      <MenuItem value='aaa'>AAA</MenuItem>
                      <MenuItem value='bbb'>BBB</MenuItem>
                      <MenuItem value='ccc'>CCC</MenuItem>
                      <MenuItem value='ddd'>DDD</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    selected={startDateRange}
                    startDate={startDateRange}
                    endDate={endDateRange}
                    shouldCloseOnSelect={false}
                    id='date-range-picker-months'
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label='Order Date'
                        start={startDateRange as number | Date}
                        end={endDateRange as number | Date}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </DatePickerWrapper>
          <DataGrid
            autoHeight
            rows={isFirst ? reports : filterData}
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
  )
}

export default ReportList
