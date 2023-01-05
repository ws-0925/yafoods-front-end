// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

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
import { useDispatch, useSelector } from 'react-redux'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Actions Imports
import { fetchData } from 'src/store/apps/products'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/products/TableHeader'
import { ProductType } from 'src/types/apps/productType'

interface viewDataType {
  totalActiveProducts: number
  totalInactiveProducts: number
}

const viewData: viewDataType = {
  totalActiveProducts: 137,
  totalInactiveProducts: 125
}

interface ProductStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: ProductType
}

const productStatusList: ProductStatusType = {
  active: 'success',
  inactive: 'secondary'
}

const ProductList = () => {
  // ** State
  const [productCategory, setProductCategory] = useState<string>('')
  const [channel, setChannel] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [pageSize, setPageSize] = useState<number>(10)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.products.products)

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

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

  const uniqueCategories = [...new Set(products.map((category: any) => category.productCategory))]
  const uniqueChannels = [...new Set(products.map((product: any) => product.channel))]

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
          <MenuItem
            component={Link}
            sx={{ '& svg': { mr: 2 } }}
            href={{
              pathname: `/products/View`,
              query: {
                id: id
              }
            }}
          >
            <Icon icon='mdi:eye-outline' fontSize={20} />
            View
          </MenuItem>
          <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='mdi:pencil-outline' fontSize={20} />
            Edit
          </MenuItem>
        </Menu>
      </>
    )
  }

  const columns = [
    {
      flex: 0.2,
      minWidth: 230,
      field: 'name',
      headerName: 'Product Name',
      renderCell: ({ row }: CellType) => {
        const { eName } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{eName}</Box>
      }
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'productCategory',
      headerName: 'Product Category',
      renderCell: ({ row }: CellType) => {
        const { productCategory } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{productCategory}</Box>
      }
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'channel',
      headerName: 'Channel',
      renderCell: ({ row }: CellType) => {
        const { channel } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{channel}</Box>
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.status}
            color={productStatusList[row.status]}
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
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {viewData && (
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#16B1FF', height: '100%' }}>
                <CardContent sx={{ py: theme => `${theme.spacing(4.125)} !important` }}>
                  <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                    Total Active Products : {viewData.totalActiveProducts}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#d43b48', height: '100%' }}>
                <CardContent sx={{ py: theme => `${theme.spacing(4.125)} !important` }}>
                  <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                    Total Inactive Products : {viewData.totalInactiveProducts}
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
                  <InputLabel id='productCategory-select'>Select Product Category</InputLabel>
                  <Select
                    fullWidth
                    value={productCategory}
                    id='select-productCategory'
                    label='Select Product Category'
                    labelId='productCategory-select'
                    onChange={handleCategoryChange}
                    inputProps={{ placeholder: 'Select Product Category' }}
                  >
                    <MenuItem value=''>Select Product Category</MenuItem>
                    {uniqueCategories.map((category: any, i: any) => {
                      return (
                        <MenuItem key={i} value={category.toLowerCase()}>
                          {category}
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
          <TableHeader value={value} handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            rows={isFirst ? products : filterData}
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

export default ProductList
