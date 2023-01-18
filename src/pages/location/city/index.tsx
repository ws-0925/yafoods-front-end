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
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
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

import { getCities, changeStatus, deleteCity, editCity } from 'src/store/apps/city'
import { getCountries } from 'src/store/apps/country'

// ** import Backdrop
import Loading from 'src/utils/backdrop'

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
  const [searchValue, setSearchValue] = useState<string>('')
  const [addCityOpen, setAddCityOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<number>(0)
  const [changeId, setChangeId] = useState<number>(0)
  const [currentStatue, setCurrentStatus] = useState<number>(0)
  const [openStatusModal, setOpenStatusModal] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [countryId, setCountryId] = useState<number>(0)
  const [name, setName] = useState<string>('')
  const [nameAr, setNameAr] = useState<string>('')
  const [editId, setEditId] = useState<number>(0)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const cities = useSelector((state: RootState) => state.city.cities)
  const rowCount = useSelector((state: RootState) => state.city.totalCount)
  const countries = useSelector((state: RootState) => state.country.countries)

  useEffect(() => {
    const data = {
      limit: pageSize,
      offset: page * pageSize,
      search: searchValue
    }
    dispatch(getCities(data))
  }, [dispatch, page, pageSize, searchValue])

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

  const handleFilter = useCallback((val: string) => {
    setSearchValue(val)
  }, [])

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

  const handleEditClose = () => setOpenEdit(false)

  const handleEditCityOpenModal = (id: number) => {
    api
      .get(`api/backend/city/${id}`, {
        headers: {
          'accept-language': 'en'
        }
      })
      .then(res => {
        const data = res.data.data
        setName(data.title)
        setNameAr(data.title_ar)
        setCountryId(data.country_id)
        setOpenEdit(true)
      })
    setEditId(id)
  }

  const handleChangeCountry = (e: any) => {
    setCountryId(e.target.value)
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

  const handleDeleteCity = (id: number) => {
    const data = {
      id: id,
      limit: pageSize,
      offset: page * pageSize,
      search: searchValue
    }
    dispatch(deleteCity(data)).then((res: any) => {
      res.payload.response == undefined
        ? toast.success(res.payload.message)
        : toast.error(res.payload.response.data.message)
    })
    setOpen(false)
  }

  const handleEditCity = () => {
    const data = {
      id: editId,
      data: {
        country_id: countryId,
        title: [
          {
            locale: 'en',
            value: name
          },
          {
            locale: 'ar',
            value: nameAr
          }
        ]
      }
    }

    setLoading(true)
    dispatch(editCity(data)).then(res => {
      res.payload.response == undefined
        ? toast.success(res.payload.message)
        : toast.error(res.payload.response.data.errors[0])
      setLoading(false)
    })

    setOpenEdit(false)
  }

  const toggleAddCityDrawer = () => setAddCityOpen(!addCityOpen)
  const handleClose = () => setOpen(false)

  const columns = [
    {
      flex: 0.3,
      minWidth: 150,
      field: 'title',
      headerName: 'City Name',
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
              <IconButton size='small' onClick={() => handleEditCityOpenModal(row.id)}>
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
      <Loading open={loading} />
      <Grid item xs={12}>
        <Card>
          <CardHeader title='City Management' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <Divider />
          <TableHeader value={searchValue} handleFilter={handleFilter} toggle={toggleAddCityDrawer} />
          <DataGrid
            autoHeight
            rows={cities}
            columns={columns}
            page={page}
            pageSize={pageSize}
            rowCount={rowCount}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageChange={(newPage: any) => setPage(newPage)}
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
        <Fragment>
          <Dialog
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby='user-view-edit'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
            aria-describedby='user-view-edit-description'
          >
            <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
              Edit City Information
            </DialogTitle>
            <DialogContent>
              <form>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={12} sx={{ mt: 5 }}>
                    <TextField
                      fullWidth
                      label='City Name With English'
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      sx={{ direction: 'rtl' }}
                      label='City Name With Arabic'
                      value={nameAr}
                      onChange={e => setNameAr(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                      <InputLabel id='country_id'>Select Country</InputLabel>
                      <Select
                        fullWidth
                        value={countryId}
                        label='Select Country'
                        id='country-id'
                        onChange={handleChangeCountry}
                        inputProps={{ placeholder: 'Select Country' }}
                      >
                        <MenuItem value={0}>Select Country</MenuItem>
                        {countries.map((country: any) => (
                          <MenuItem value={country.id} key={country.id}>
                            {country.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 1 }} onClick={handleEditCity}>
                Submit
              </Button>
              <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      </Grid>

      <AddCityDrawer open={addCityOpen} toggle={toggleAddCityDrawer} />
    </Grid>
  )
}

export default CityList
