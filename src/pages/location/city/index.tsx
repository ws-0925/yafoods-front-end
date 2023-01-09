// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** Next Imports

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import CardHeader from '@mui/material/CardHeader'
import { IconButton } from '@mui/material'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/city/TableHeader'
import { CityType } from 'src/types/apps/cityType'
import AddCityDrawer from 'src/views/apps/city/AddCityDrawer'
import { getCities } from 'src/store/apps/city'

interface CityStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: CityType
}

const cityStatusList: CityStatusType = {
  active: 'success',
  inactive: 'secondary'
}

const CityList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(10)
  const [page, setPage] = useState<number>(0)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const cities = useSelector((state: RootState) => state.city.cities)
  const rowCount = useSelector((state: RootState) => state.city.totalCount)

  useEffect(() => {
    const data = {
      limit: pageSize,
      offset: page * pageSize
    }
    dispatch(getCities(data))
  }, [dispatch, page, pageSize])

  const handleFilter = useCallback(
    (val: string) => {
      setValue(val)
      setIsFirst(false)
      if (val == '') {
        setFilterData(cities)

        return
      }
      let data: any = []
      data = cities.filter((item: { city_title_en: any }) => item.city_title_en.toLowerCase().search(val) != -1)
      setFilterData(data)
    },
    [cities]
  )

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const RowOptions = ({ id }: { id: number | string }) => {
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
          <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleRowOptionsClose}>
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
      flex: 0.3,
      minWidth: 230,
      field: 'city_title_en',
      headerName: 'City Name',
      renderCell: ({ row }: CellType) => {
        const { city_title_en } = row

        return (
          <Typography noWrap variant='body2'>
            {city_title_en}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: () => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={'active'}
            color={cityStatusList['active']}
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
        <Card>
          <CardHeader title='City Management' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <Divider />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rows={isFirst ? cities : filterData}
            columns={columns}
            page={page}
            pageSize={pageSize}
            rowCount={rowCount}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageChange={(newPage: number) => setPage(newPage)}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
            paginationMode='server'
          />
        </Card>
      </Grid>

      <AddCityDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export default CityList
