// ** React Imports
import { useState, useEffect, useCallback, Fragment } from 'react'

// ** import api
import api from 'src/utils/api'

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
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { getCityList } from 'src/store/apps/city'
import { getAreas, deleteArea, changeStatus, editArea } from 'src/store/apps/area'

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
  const [searchValue, setSearchValue] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [open, setOpen] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<number>(0)
  const [changeId, setChangeId] = useState<number>(0)
  const [currentStatue, setCurrentStatus] = useState<number>(0)
  const [openStatusModal, setOpenStatusModal] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [nameAr, setNameAr] = useState<string>('')
  const [areaCode, setAreaCode] = useState<string>('')
  const [longitude, setLongitude] = useState<number>(0)
  const [latitude, setLatitude] = useState<number>(0)
  const [googleAreaTitle, setGoogleAreaTitle] = useState<string>('')
  const [googleAreaTitleAr, setGoogleAreaTitleAr] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [editId, setEditId] = useState<number>(0)
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const areas = useSelector((state: RootState) => state.area.areas)
  const cityList = useSelector((state: RootState) => state.city.cityList)
  const rowCount = useSelector((state: RootState) => state.area.totalCount)
  useEffect(() => {
    const data = {
      limit: pageSize,
      offset: page * pageSize,
      search: searchValue
    }

    dispatch(getAreas(data))
  }, [dispatch, page, pageSize, searchValue])

  useEffect(() => {
    dispatch(getCityList())
  }, [dispatch])

  const handleFilter = useCallback((val: string) => {
    setSearchValue(val)
  }, [])

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

  const handleEditArea = () => {
    const data = {
      id: editId,
      data: {
        city_id: city,
        latitude: latitude,
        longitude: longitude,
        area_code: areaCode,
        title: [
          {
            locale: 'en',
            value: name
          },
          {
            locale: 'ar',
            value: nameAr
          }
        ],
        google_area_title: [
          {
            locale: 'en',
            value: googleAreaTitle
          },
          {
            locale: 'ar',
            value: googleAreaTitleAr
          }
        ]
      }
    }
    dispatch(editArea(data)).then(res => {
      res.payload !== undefined ? toast.success(res.payload.message) : toast.error('internal server error')
    })
    setOpenEdit(false)
  }

  const handleEditClose = () => setOpenEdit(false)

  const handleCityChange = (e: any) => {
    setCity(e.target.value)
  }

  const handleEditAreaOpenModal = (id: number) => {
    api
      .get(`api/backend/area/${id}`, {
        headers: {
          'accept-language': 'en'
        }
      })
      .then(res => {
        const data = res.data.data
        setName(data.title)
        setAreaCode(data.area_code)
        setLongitude(data.longitude)
        setLatitude(data.latitude)
        setCity(data.city)
        setGoogleAreaTitle(googleAreaTitle)
        setOpenEdit(true)
      })
    setEditId(id)
  }

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
      field: 'title',
      headerName: 'Area',
      renderCell: ({ row }: CellType) => {
        const { title } = row

        return (
          <Typography noWrap variant='body2'>
            {title}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'google_area_title',
      headerName: 'Google Area',
      renderCell: ({ row }: CellType) => {
        const { google_area_title } = row

        return (
          <Typography noWrap variant='body2'>
            {google_area_title}
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
            label={row.status == 1 ? 'active' : 'inactive'}
            color={cityStatusList[row.status]}
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
              <IconButton size='small' onClick={() => handleEditAreaOpenModal(row.id)}>
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
          <TableHeader value={searchValue} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rows={areas}
            columns={columns}
            page={page}
            rowCount={rowCount}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageChange={(newPage: number) => setPage(newPage)}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
            paginationMode='server'
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
        <Fragment>
          <Dialog
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby='user-view-edit'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
            aria-describedby='user-view-edit-description'
          >
            <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
              Edit Area Information
            </DialogTitle>
            <DialogContent>
              <form>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6} sx={{ mt: 5 }}>
                    <TextField
                      fullWidth
                      label='City Name With English'
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='City Name With Arabic'
                      value={nameAr}
                      onChange={e => setNameAr(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ mt: 5 }}>
                    <TextField
                      fullWidth
                      label='Area Code'
                      value={areaCode}
                      onChange={e => setAreaCode(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ mt: 5 }}>
                    <TextField
                      fullWidth
                      label='Latitude'
                      type='number'
                      value={latitude}
                      onChange={(e: any) => setLatitude(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ mt: 5 }}>
                    <TextField
                      fullWidth
                      label='Longitude'
                      type='number'
                      value={longitude}
                      onChange={(e: any) => setLongitude(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ mt: 5 }}>
                    <TextField
                      fullWidth
                      label='Google Area Title'
                      value={googleAreaTitle}
                      onChange={e => setGoogleAreaTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ mt: 5 }}>
                    <TextField
                      fullWidth
                      label='Google Area Title Arabic'
                      value={googleAreaTitleAr}
                      onChange={e => setGoogleAreaTitleAr(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                      <InputLabel id='city_id'>Select City</InputLabel>
                      <Select
                        fullWidth
                        value={city}
                        id='select-city'
                        label='Select City'
                        labelId='city-select'
                        onChange={handleCityChange}
                        inputProps={{ placeholder: 'Select City' }}
                      >
                        <MenuItem value={0}>Select City</MenuItem>
                        {cityList.map((city: any) => (
                          <MenuItem value={city.id} key={city.id}>
                            {city.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 1 }} onClick={handleEditArea}>
                Submit
              </Button>
              <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      </Grid>

      <AddAreaDrawer open={addUserOpen} toggle={toggleAddUserDrawer} cities={cityList} />
    </Grid>
  )
}

export default AreaList
