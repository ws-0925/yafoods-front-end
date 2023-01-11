// ** React Imports
import { useState, useEffect, useCallback, Fragment } from 'react'

// ** Next Imports
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
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Actions Imports
import { getProducts, deleteProduct } from 'src/store/apps/products'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/products/TableHeader'
import { ProductType } from 'src/types/apps/productType'

interface ProductStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: ProductType
}

const productStatusList: ProductStatusType = {
  1: 'success',
  0: 'secondary'
}

const ProductList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [filterData, setFilterData] = useState<any>([])
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const [page, setPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [open, setOpen] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<number>(0)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.products.products)
  const rowCount = useSelector((state: RootState) => state.products.totalCount)

  useEffect(() => {
    const data = {
      limit: pageSize,
      offset: page * pageSize
    }
    dispatch(getProducts(data))
  }, [dispatch, page, pageSize])

  const handleClickOpen = (id: number) => {
    setDeleteId(id)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleFilter = useCallback(
    (val: string) => {
      setValue(val)
      setIsFirst(false)
      if (val == '') {
        setFilterData(products)

        return
      }
      let data: any = []
      data = products.filter((item: { name: any }) => item.name.toLowerCase().search(val) != -1)
      setFilterData(data)
    },
    [products]
  )

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id)).then(res => {
      res.payload !== undefined ? toast.success(res.payload.message) : toast.error('Internal Server Error')
    })
    setOpen(false)
  }

  const columns = [
    {
      flex: 0.2,
      minWidth: 230,
      field: 'name',
      headerName: 'Product Name',
      renderCell: ({ row }: CellType) => {
        const { name } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{name}</Box>
      }
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'description',
      headerName: 'Product Description',
      renderCell: ({ row }: CellType) => {
        const { description } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{description}</Box>
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
            label={row.product_id.status == 1 ? 'active' : 'inactive'}
            color={productStatusList[row.product_id.status]}
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
            <Tooltip title='Product Variant View'>
              <IconButton
                size='small'
                component={Link}
                href={{
                  pathname: `/products/View`,
                  query: {
                    id: row.product_id.id
                  }
                }}
              >
                <Icon icon='mdi:eye-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit Product'>
              <IconButton
                size='small'
                component={Link}
                href={{
                  pathname: `/products/EditProduct`,
                  query: {
                    id: row.product_id.id
                  }
                }}
              >
                <Icon icon='mdi:edit-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete Product'>
              <IconButton size='small' onClick={() => handleClickOpen(row.product_id.id)}>
                <Icon icon='mdi:delete-outline' fontSize={20} />
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
          <CardHeader title='Manage Product' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <Divider />
          <TableHeader value={value} handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            rows={isFirst ? products : filterData}
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
        <Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Really?</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>Are you really deleting this product?</DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={() => handleDeleteProduct(deleteId)}>Agree</Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      </Grid>
    </Grid>
  )
}

export default ProductList
