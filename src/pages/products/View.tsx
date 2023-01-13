// ** React Imports
import { useState, useEffect, Fragment, useCallback } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Icon from 'src/@core/components/icon'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { toast } from 'react-hot-toast'

// import Switch from '@mui/material/Switch'

// ** Custom Table Components Imports
import { ProductVariantType } from 'src/types/apps/productType'
import { Typography } from '@mui/material'
import { ThemeColor } from 'src/@core/layouts/types'
import TableHeader from 'src/views/apps/product-variant/TableHeader'

// ** import Next
import Link from 'next/link'

import CustomChip from 'src/@core/components/mui/chip'

// ** import Router
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { getVariantProducts, getProduct, deleteProductVariant, changeVariantStatus } from 'src/store/apps/products'

interface ProductStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: ProductVariantType
}

const productStatusList: ProductStatusType = {
  1: 'success',
  0: 'secondary'
}

const ViewList = () => {
  // ** State
  const [pageSize, setPageSize] = useState<number>(10)

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [value, setValue] = useState<string>('')
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [filterData, setFilterData] = useState<any>([])
  const [open, setOpen] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<number>(0)
  const [changeId, setChangeId] = useState<number>(0)
  const [currentStatue, setCurrentStatus] = useState<number>(0)
  const [openStatusModal, setOpenStatusModal] = useState<boolean>(false)

  const id: any = router.query.id

  const allVariantProducts = useSelector((state: RootState) => state.products.variantProducts)
  const variantProducts = allVariantProducts.filter((item: any) => item.product_id == id)
  const product = useSelector((state: RootState) => state.products.product)

  useEffect(() => {
    dispatch(getVariantProducts())
  }, [dispatch])

  useEffect(() => {
    dispatch(getProduct(id))
  }, [dispatch, id])

  const handleClickOpen = (id: number) => {
    setDeleteId(id)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProductVariant(id)).then(res => {
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
    dispatch(changeVariantStatus(data)).then(res => {
      res.payload !== undefined ? toast.success(res.payload.message) : toast.error('internal server error')
    })
    setOpenStatusModal(false)
  }

  const handleFilter = useCallback(
    (val: string) => {
      setValue(val)
      setIsFirst(false)
      if (val == '') {
        setFilterData(variantProducts)

        return
      }
      let data: any = []
      data = variantProducts.filter((item: { name: any }) => item.name.toLowerCase().search(val) != -1)
      setFilterData(data)
    },
    [variantProducts]
  )

  const columns = [
    {
      flex: 0.2,
      minWidth: 130,
      field: 'name',
      headerName: 'Product Variant Name',
      renderCell: ({ row }: CellType) => {
        const { name } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{name}</Box>
      }
    },
    {
      flex: 0.3,
      minWidth: 230,
      field: 'description',
      headerName: 'Product Variant Description',
      renderCell: ({ row }: CellType) => {
        const { description } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{description}</Box>
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'barCode',
      headerName: 'BarCode',
      renderCell: ({ row }: CellType) => {
        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{row.barcode}</Box>
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.status == 1 ? 'active' : 'inactive'}
            color={productStatusList[row.status]}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      }
    },

    // {
    //   flex: 0.1,
    //   minWidth: 90,
    //   sortable: false,
    //   field: 'stock',
    //   headerName: 'Stock',
    //   renderCell: () => {
    //     return <Switch defaultChecked />
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
            <Tooltip title='Delete Product Variant'>
              <IconButton size='small' onClick={() => handleClickOpen(row.id)}>
                <Icon icon='mdi:delete-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit Product Variant'>
              <IconButton
                size='small'
                component={Link}
                href={{
                  pathname: '/products/EditProductVariant',
                  query: {
                    id: row.id
                  }
                }}
              >
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
      <Grid item xs={12} sx={{ mt: 5 }}>
        <Card sx={{ p: 5 }}>
          <Box sx={{ display: 'flex' }}>
            <Typography fontSize={20}>Product Group Name: {product?.name}</Typography>
          </Box>
        </Card>
        <Card sx={{ mt: 15 }}>
          <TableHeader value={value} handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            rows={isFirst ? variantProducts : filterData}
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
              <DialogContentText id='alert-dialog-description'>
                Are you really deleting this category?
              </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={() => handleDeleteProduct(deleteId)}>Agree</Button>
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

export default ViewList
