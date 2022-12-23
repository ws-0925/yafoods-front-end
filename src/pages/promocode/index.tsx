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
import { fetchData } from 'src/store/apps/promoCode'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/promoCode/TableHeader'
import { PromoCodeType } from 'src/types/apps/PromoCodeType'

interface viewDataType {
  totalActivePromos: number
  totalInactivePromos: number
}

const viewData: viewDataType = {
  totalActivePromos: 137,
  totalInactivePromos: 125
}

interface ProductStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: PromoCodeType
}

const productStatusList: ProductStatusType = {
  active: 'success',
  inactive: 'secondary'
}

const PromosList = () => {
  // ** State
  const [status, setStatus] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [pageSize, setPageSize] = useState<number>(10)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const promoCodes = useSelector((state: RootState) => state.promoCode.promoCodes)

  const handleStatusChange = useCallback(
    (e: SelectChangeEvent) => {
      setIsFirst(false)
      if (e.target.value == '') {
        setFilterData(promoCodes)

        return
      }
      const data = promoCodes.filter(
        (item: { eName: string }) => item.eName.toLowerCase() == e.target.value.toLowerCase()
      )
      setFilterData(data)
      setStatus(e.target.value)
    },
    [promoCodes]
  )

  const handleFilter = useCallback(
    (val: string) => {
      setValue(val)
      setIsFirst(false)
      if (val == '') {
        setFilterData(promoCodes)

        return
      }
      let data: any = []
      data = promoCodes.filter((item: { eName: any }) => item.eName.toLowerCase().search(val) != -1)
      setFilterData(data)
    },
    [promoCodes]
  )

  const uniqueNames = [...new Set(promoCodes.map((promoCode: any) => promoCode.eName))]

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
            onClick={handleRowOptionsClose}
            href='/apps/user/view/overview/'
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
      flex: 0.5,
      minWidth: 230,
      field: 'eName',
      headerName: 'Promo Name',
      renderCell: ({ row }: CellType) => {
        const { eName } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{eName}</Box>
      }
    },
    {
      flex: 0.2,
      minWidth: 210,
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
                    Total Active Promos : {viewData.totalActivePromos}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#d43b48', height: '100%' }}>
                <CardContent sx={{ py: theme => `${theme.spacing(4.125)} !important` }}>
                  <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                    Total Inactive Promos : {viewData.totalInactivePromos}
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
                    label='Select status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Status' }}
                  >
                    <MenuItem value=''>Select Status</MenuItem>
                    {uniqueNames.map((name: any, i: any) => {
                      return (
                        <MenuItem key={i} value={name.toLowerCase()}>
                          {name}
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
            rows={isFirst ? promoCodes : filterData}
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

export default PromosList
