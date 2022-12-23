// ** React Imports
import { useState, useCallback, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import { CardContent } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'

// import { DataGridPro } from '@mui/x-data-grid-pro'
import Box from '@mui/material/Box'

// ** Custom Table Components Imports
import TableHeaderSort from 'src/views/apps/category/TableHeaderSort'
import { AgGridReact } from 'ag-grid-react'
import { useDispatch, useSelector } from 'react-redux'
import { useSettings } from 'src/@core/hooks/useSettings'
import { AppDispatch, RootState } from 'src/store'

import PopupCellRenderer from './PopupCellRenderer'

// ** Actions Imports
import { fetchData } from 'src/store/apps/products'

const SortList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const { settings } = useSettings()
  const [productCategory, setProductCategory] = useState<string>('')
  const [channel, setChannel] = useState<string>('')

  const { mode } = settings

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const products = useSelector((state: RootState) => state.products.products)

  const uniqueCategories = [...new Set(products.map((category: any) => category.productCategory))]
  const uniqueChannels = [...new Set(products.map((product: any) => product.channel))]

  const handleFilter = useCallback(
    (val: string) => {
      setValue(val)
      setIsFirst(false)
      if (val == '') {
        setFilterData(products)

        return
      }
      let data: any = []
      data = products.filter((item: { eName: any }) => item.eName.toLowerCase().search(val) != -1)
      setFilterData(data)
    },
    [products]
  )

  const handleCategoryChange = useCallback(
    (e: SelectChangeEvent) => {
      setIsFirst(false)
      if (e.target.value == '') {
        setFilterData(products)

        return
      }
      console.log(e.target.value)
      const data = products.filter(
        (item: { productCategory: string }) => item.productCategory.toLowerCase() == e.target.value.toLowerCase()
      )
      setFilterData(data)
      setProductCategory(e.target.value)
    },
    [products]
  )

  const handleChannelChange = useCallback(
    (e: SelectChangeEvent) => {
      setIsFirst(false)
      if (e.target.value == '') {
        setFilterData(products)

        return
      }
      const data = products.filter(
        (item: { channel: string }) => item.channel.toLowerCase() == e.target.value.toLowerCase()
      )
      setFilterData(data)
      setChannel(e.target.value)
    },
    [products]
  )

  let tableColor = ''

  if (mode == 'dark') {
    tableColor = 'rgba(234, 234, 255, 0.87)'
  } else {
    tableColor = 'rgba(76, 78, 100, 0.87)'
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 230,
      field: 'eName',
      headerName: 'Category Name',
      rowDrag: (params: any) => !params.node.group,

      cellStyle: () => {
        return {
          color: tableColor,
          fontFamily: 'Inter'
        }
      }
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'productCategory',
      headerName: 'Product Category',
      cellStyle: () => {
        return {
          color: tableColor,
          fontFamily: 'Inter'
        }
      }
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'channel',
      headerName: 'Channel',
      cellStyle: () => {
        return {
          color: tableColor,
          fontFamily: 'Inter'
        }
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      cellRendererFramework: PopupCellRenderer
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader variant='h4' sx={{ p: 5 }} title=' Drag and Drop to Sort Products' />
          <Divider />
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='productCategory-select'>Select Category Parent</InputLabel>
                  <Select
                    fullWidth
                    value={productCategory}
                    id='select-productCategory'
                    label='Select Product Category'
                    labelId='productCategory-select'
                    onChange={handleCategoryChange}
                    inputProps={{ placeholder: 'Select Product Category' }}
                  >
                    <MenuItem value=''>Select Parent Category</MenuItem>
                    {uniqueCategories.map((productCategory: any, i: any) => {
                      return (
                        <MenuItem key={i} value={productCategory.toLowerCase()}>
                          {productCategory}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='channel-select'>Select Channels</InputLabel>
                  <Select
                    fullWidth
                    value={channel}
                    id='select-channel'
                    label='Select channel'
                    labelId='channel-select'
                    onChange={handleChannelChange}
                    inputProps={{ placeholder: 'Select channel' }}
                  >
                    <MenuItem value=''>Select Channel</MenuItem>
                    {uniqueChannels.map((channel: any, i: any) => {
                      return (
                        <MenuItem key={i} value={channel.toLowerCase()}>
                          {channel}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />

          <TableHeaderSort value={value} handleFilter={handleFilter} />
          <Box
            className={mode == 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}
            style={{ width: '100%', height: 500 }}
          >
            <AgGridReact
              rowData={isFirst ? products : filterData}
              columnDefs={columns}
              animateRows={true}
              rowDragManaged={true}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SortList
