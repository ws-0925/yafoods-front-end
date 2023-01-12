// ** React Imports
import { useState, useEffect, useCallback, Fragment } from 'react'

// ** Next Imports
// import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import CardHeader from '@mui/material/CardHeader'
import { IconButton } from '@mui/material'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { toast } from 'react-hot-toast'

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
import { getCities, changeStatus, deleteCity } from 'src/store/apps/city'

interface CityStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: CityType
}

const cityStatusList: CityStatusType = {
  1: 'success',
  0: 'secondary'
}

const CityList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(10)
  const [open, setOpen] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<number>(0)
  const [changeId, setChangeId] = useState<number>(0)
  const [currentStatue, setCurrentStatus] = useState<number>(0)
  const [openStatusModal, setOpenStatusModal] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const cities = useSelector((state: RootState) => state.city.cities)

  useEffect(() => {
    dispatch(getCities())
  }, [dispatch])

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

  const handleClickOpen = (id: number) => {
    setDeleteId(id)
    setOpen(true)
  }

  const handleClickOpenStatusModal = (id: number, flag: number) => {
    const status = flag == 1 ? 0 : 1
    setChangeId(id)
    setCurrentStatus(status)
    setOpenStatusModal(true)
  }

  const handleCloseStatusModal = () => setOpenStatusModal(false)

  const handleChangeStatus = (id: number, status: number) => {
    const data = {
      id: id,
      data: {
        status: status
      }
    }
    dispatch(changeStatus(data)).then(res => {
      res.payload !== undefined ? toast.success(res.payload.message) : toast.error('internal server error')
    })
    setOpenStatusModal(false)
  }

  const handleDeleteCity = (id: number) => {
    dispatch(deleteCity(id)).then((res: any) => {
      res.payload !== undefined ? toast.success(res.payload.message) : toast.error('internal server error')
    })
    setOpen(false)
  }

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
  const handleClose = () => setOpen(false)

  const columns = [
    {
      flex: 0.2,
      minWidth: 150,
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
      flex: 0.5,
      minWidth: 230,
      field: 'city_title_ar',
      headerName: 'City Name',
      renderCell: ({ row }: CellType) => {
        const { city_title_ar } = row

        return (
          <Typography noWrap variant='body2'>
            {city_title_ar}
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
            color={cityStatusList[1]}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='Delete City'>
              <IconButton size='small' onClick={() => handleClickOpen(row.id)}>
                <Icon icon='mdi:delete-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit City'>
              <IconButton size='small'>
                <Icon icon='mdi:edit-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Change Product Status'>
              <IconButton size='small' onClick={() => handleClickOpenStatusModal(row.id, row.status)}>
                <Icon icon='mdi:swap-horizontal' fontSize={20} />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
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
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          />
        </Card>
        <Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Really?</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>Are you really deleting this City?</DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={() => handleDeleteCity(deleteId)}>Agree</Button>
            </DialogActions>
          </Dialog>
        </Fragment>
        <Fragment>
          <Dialog
            open={openStatusModal}
            onClose={handleCloseStatusModal}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Really?</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>Are you really change this status?</DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={handleCloseStatusModal}>Disagree</Button>
              <Button onClick={() => handleChangeStatus(changeId, currentStatue)}>Agree</Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      </Grid>

      <AddCityDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export default CityList
