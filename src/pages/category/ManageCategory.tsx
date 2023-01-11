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

// import Switch from '@mui/material/Switch'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Actions Imports
import { deleteCategory, getCategories, changeStatus } from 'src/store/apps/category'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/category/TableHeader'
import { CategoryType } from 'src/types/apps/categoryType'
import { toast } from 'react-hot-toast'

interface CategoryStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: CategoryType
}

const categoryStatusList: CategoryStatusType = {
  1: 'success',
  0: 'secondary'
}

const CategoryList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [pageSize, setPageSize] = useState<number>(10)
  const [page, setPage] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<number>(0)
  const [changeId, setChangeId] = useState<number>(0)
  const [currentStatue, setCurrentStatus] = useState<number>(0)
  const [openStatusModal, setOpenStatusModal] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const categories = useSelector((state: RootState) => state.category.categories)
  const rowCount = useSelector((state: RootState) => state.category.totalCount)
  useEffect(() => {
    const data = {
      limit: pageSize,
      offset: page * pageSize
    }
    dispatch(getCategories(data))
  }, [dispatch, page, pageSize])

  const handleClickOpen = (id: number) => {
    setDeleteId(id)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleDeleteCategory = (id: number) => {
    dispatch(deleteCategory(id)).then(res => {
      res.payload !== undefined ? toast.success(res.payload.message) : toast.error('internal server error')
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
    dispatch(changeStatus(data)).then(res => {
      res.payload !== undefined ? toast.success(res.payload.message) : toast.error('internal server error')
    })
    setOpenStatusModal(false)
  }

  const handleFilter = useCallback(
    (val: string) => {
      setValue(val)
      setIsFirst(false)
      if (val == '') {
        setFilterData(categories)

        return
      }
      let data: any = []
      data = categories.filter((item: { category_name: any }) => item.category_name.toLowerCase().search(val) != -1)
      setFilterData(data)
    },
    [categories]
  )

  const columns = [
    {
      flex: 0.2,
      minWidth: 130,
      field: 'name',
      headerName: 'Category Name',
      renderCell: ({ row }: CellType) => {
        const { category_name } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{category_name}</Box>
      }
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'category_description',
      headerName: 'Category Description',
      renderCell: ({ row }: CellType) => {
        const { category_description } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{category_description}</Box>
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
            label={row.category_id.status == 1 ? 'active' : 'inactive'}
            color={categoryStatusList[row.category_id.status]}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      }
    },

    // {
    //   flex: 0.1,
    //   minWidth: 90,
    //   sortable: false,
    //   field: 'status',
    //   headerName: 'Status',
    //   renderCell: ({ row }: CellType) => {
    //     const status = row.category_id.status

    //     return status == 1 ? <Switch defaultChecked /> : <Switch />
    //   }
    // },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='Delete Category'>
              <IconButton size='small' onClick={() => handleClickOpen(row.category_id.id)}>
                <Icon icon='mdi:delete-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit Category'>
              <IconButton
                size='small'
                component={Link}
                href={{
                  pathname: '/category/EditCategory',
                  query: {
                    id: row.category_id.id
                  }
                }}
              >
                <Icon icon='mdi:edit-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Change Category Status'>
              <IconButton
                size='small'
                onClick={() => handleClickOpenStatusModal(row.category_id.id, row.category_id.status)}
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
            title='Category Management'
            sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
          />
          <Divider />
          <TableHeader value={value} handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            rows={isFirst ? categories : filterData}
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
                Are you really deleting this category?
              </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={() => handleDeleteCategory(deleteId)}>Agree</Button>
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

export default CategoryList
