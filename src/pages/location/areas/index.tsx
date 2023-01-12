// ** React Imports
import { useState, useEffect, useCallback, Fragment } from 'react'

// ** Next Imports

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import CardHeader from '@mui/material/CardHeader'
import { IconButton } from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { toast } from 'react-hot-toast'

import { ThemeColor } from 'src/@core/layouts/types'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { getCityList } from 'src/store/apps/city'
import { getAreas, deleteArea, changeStatus } from 'src/store/apps/area'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/area/TableHeader'
import { AreaType } from 'src/types/apps/areaType'
import AddAreaDrawer from 'src/views/apps/area/AddAreaDrawer'
import CustomChip from 'src/@core/components/mui/chip'

interface CityStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: AreaType
}

const cityStatusList: CityStatusType = {
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
  const [open, setOpen] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<number>(0)
  const [changeId, setChangeId] = useState<number>(0)
  const [currentStatue, setCurrentStatus] = useState<number>(0)
  const [openStatusModal, setOpenStatusModal] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const areas = useSelector((state: RootState) => state.area.areas)
  const cityList = useSelector((state: RootState) => state.city.cityList)

  useEffect(() => {
    dispatch(getAreas())
  }, [dispatch])

  useEffect(() => {
    dispatch(getCityList())
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
      data = areas.filter((item: { area_title_en: any }) => item.area_title_en?.toLowerCase().search(val) != -1)
      setFilterData(data)
    },
    [areas]
  )

  const handleClickOpen = (id: number) => {
    setDeleteId(id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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

  const handleDeleteArea = (id: number) => {
    dispatch(deleteArea(id)).then(res => {
      res.payload !== undefined ? toast.success(res.payload.message) : toast.error('internal server error')
    })
    setOpen(false)
  }

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

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
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='Delete Area'>
              <IconButton size='small' onClick={() => handleClickOpen(row.id)}>
                <Icon icon='mdi:delete-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit Area'>
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
          <CardHeader title='Area Management' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <Divider />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rows={isFirst ? areas : filterData}
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
              <DialogContentText id='alert-dialog-description'>Are you really deleting this Area?</DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={() => handleDeleteArea(deleteId)}>Agree</Button>
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

      <AddAreaDrawer open={addUserOpen} toggle={toggleAddUserDrawer} cities={cityList} />
    </Grid>
  )
}

export default AreaList
