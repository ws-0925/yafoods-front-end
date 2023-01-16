// ** React Imports
import { useState, useEffect, useCallback, Fragment } from 'react'
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import CardHeader from '@mui/material/CardHeader'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { styled } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Actions Imports
import { deleteSpecialOffer, getSpecialOffers, changeStatus } from 'src/store/apps/special-offers'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/special-offers/TableHeader'
import { SpecialOfferType } from 'src/types/apps/specialOfferType'
import { toast } from 'react-hot-toast'

interface SpecialOfferStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: SpecialOfferType
}

const ViewImage = styled('img')(({ theme }) => ({
  height: '40px',
  width: '40px',
  objectFit: 'revert',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '35px',
    maxHeight: '35px'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '25px',
    maxHeight: '25px'
  }
}))

const specialOfferStatusList: SpecialOfferStatusType = {
  1: 'success',
  0: 'secondary'
}

const SpecialOfferList = () => {
  // ** State
  const [searchValue, setSearchValue] = useState<string>('')

  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [open, setOpen] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<number>(0)
  const [changeId, setChangeId] = useState<number>(0)
  const [currentStatue, setCurrentStatus] = useState<number>(0)
  const [openStatusModal, setOpenStatusModal] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const specialOffers = useSelector((state: RootState) => state.specialOffers.specialOffers)
  const rowCount = useSelector((state: RootState) => state.specialOffers.totalCount)
  useEffect(() => {
    const data = {
      limit: pageSize,
      offset: page * pageSize,
      search: searchValue
    }
    dispatch(getSpecialOffers(data))
  }, [dispatch, page, pageSize, searchValue])

  const handleFilter = useCallback((val: string) => {
    setSearchValue(val)
  }, [])

  const handleClickOpen = (id: number) => {
    setDeleteId(id)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleDeleteSpecialOffer = (id: number) => {
    const data = {
      id: id,
      limit: pageSize,
      offset: page * pageSize,
      search: searchValue
    }
    dispatch(deleteSpecialOffer(data)).then(res => {
      res.payload.response == undefined
        ? toast.success(res.payload.message)
        : toast.error(res.payload.response.data.message)
    })
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
    dispatch(changeStatus(data)).then((res: any) => {
      res.payload !== undefined ? toast.success(res.payload.message) : toast.error('internal server error')
    })
    setOpenStatusModal(false)
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: 'id',
      renderCell: ({ row }: CellType) => {
        const { id } = row.special_offer_id

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{id}</Box>
      }
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'image',
      headerName: 'Image',
      renderCell: ({ row }: CellType) => {
        const { image } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <ViewImage src={image} alt={image} />
          </Box>
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
            label={row.special_offer_id.status == 1 ? 'active' : 'inactive'}
            color={specialOfferStatusList[row.special_offer_id.status]}
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
            <Tooltip title='Delete Special Offer'>
              <IconButton size='small' onClick={() => handleClickOpen(row.special_offer_id.id)}>
                <Icon icon='mdi:delete-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit Special Offer'>
              <IconButton
                size='small'
                component={Link}
                href={{
                  pathname: '/special-offers/EditSpecialOffer',
                  query: {
                    id: row.special_offer_id.id
                  }
                }}
              >
                <Icon icon='mdi:edit-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Change Special Offer Status'>
              <IconButton
                size='small'
                onClick={() => handleClickOpenStatusModal(row.special_offer_id.id, row.special_offer_id.status)}
              >
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
          <CardHeader
            title='Special Offer Management'
            sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
          />
          <Divider />
          <TableHeader value={searchValue} handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            rows={specialOffers}
            columns={columns}
            rowCount={rowCount}
            page={page}
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
              <DialogContentText id='alert-dialog-description'>
                Are you really deleting this special offer?
              </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={() => handleDeleteSpecialOffer(deleteId)}>Agree</Button>
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
    </Grid>
  )
}

export default SpecialOfferList
