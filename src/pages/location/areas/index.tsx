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

// ** Actions Imports
import { getCities } from 'src/store/apps/city'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/area/TableHeader'
import { AreaType } from 'src/types/apps/areaType'
import AddAreaDrawer from 'src/views/apps/area/AddAreaDrawer'

// ** import Api
import api from 'src/utils/api'

interface AreaStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: AreaType
}

const areaStatusList: AreaStatusType = {
  1: 'success',
  0: 'secondary'
}

const AreaList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(10)
  const [page, setPage] = useState<number>(0)
  const [areas, setAreas] = useState<any>([])
  const [rowCount, setRowCount] = useState<any>([])

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const cities = useSelector((state: RootState) => state.city.cities)

  useEffect(() => {
    const data = {
      limit: pageSize,
      offset: page * pageSize
    }
    api.get(`/api/backend/areas?limit=${data.limit}&offset=${data.offset}`).then(res => {
      setAreas(res.data.data)
      setRowCount(res.data.count)
    })
  }, [dispatch, page, pageSize])

  useEffect(() => {
    dispatch(getCities())
  }, [dispatch])

  const handleFilter = useCallback(
    (val: string) => {
      setValue(val)
      setIsFirst(false)
      if (val == '') {
        setFilterData(areas)

        return
      }
      let data: any = []
      data = areas.filter((item: { area_title_en: any }) => item.area_title_en.toLowerCase().search(val) != -1)
      setFilterData(data)
    },
    [areas]
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
          <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
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
      field: 'area_title_en',
      headerName: 'Area',
      renderCell: ({ row }: CellType) => {
        const { area_title_en } = row

        return (
          <Typography noWrap variant='body2'>
            {area_title_en}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'google_area_en',
      headerName: 'Google Area',
      renderCell: ({ row }: CellType) => {
        const { google_area_en } = row

        return (
          <Typography noWrap variant='body2'>
            {google_area_en}
          </Typography>
        )
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
            label={row.area_status == 1 ? 'active' : 'inactive'}
            color={areaStatusList[row.area_status]}
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
          <CardHeader title='Area Management' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <Divider />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rows={isFirst ? areas : filterData}
            rowCount={rowCount}
            columns={columns}
            pageSize={pageSize}
            page={page}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageChange={(newPage: number) => setPage(newPage)}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
            paginationMode='server'
          />
        </Card>
      </Grid>

      <AddAreaDrawer open={addUserOpen} toggle={toggleAddUserDrawer} cities={cities} />
    </Grid>
  )
}

export default AreaList
