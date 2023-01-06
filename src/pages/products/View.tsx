// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Icon from 'src/@core/components/icon'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

// import Switch from '@mui/material/Switch'

// ** Custom Table Components Imports
import { ProductVariantType } from 'src/types/apps/productType'
import { Typography } from '@mui/material'

// ** import Next
import Link from 'next/link'

// ** import Router
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { getVariantProducts } from 'src/store/apps/products'
import { getProducts } from 'src/store/apps/products'

interface CellType {
  row: ProductVariantType
}

const ViewList = () => {
  // ** State
  const [pageSize, setPageSize] = useState<number>(10)

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const { id } = router.query

  const allVariantProducts = useSelector((state: RootState) => state.products.variantProducts)
  const variantProducts = allVariantProducts.filter((item: any) => item.product_variant_id.product_id == id)
  const products = useSelector((state: RootState) => state.products.products)
  const product = products.filter((item: any) => item.product_id.id == id)

  useEffect(() => {
    dispatch(getVariantProducts())
  }, [dispatch])

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

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
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            {row.product_variant_id.barcode}
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'unit_id',
      headerName: 'Unit',
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            {row.product_variant_id.unit_id}
          </Box>
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
              <IconButton size='small'>
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
                    id: row.product_variant_id.id
                  }
                }}
              >
                <Icon icon='mdi:edit-outline' fontSize={20} />
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
            <Typography fontSize={20}>Product Group Name: {product[0]?.name}</Typography>
          </Box>
        </Card>
        <Card sx={{ mt: 15 }}>
          <Box sx={{ display: 'flex', justifyContent: 'right', flexWrap: 'wrap', alignItems: 'center', p: 5 }}>
            <Button variant='contained' sx={{ mr: 5 }} onClick={() => router.back()}>
              Back
            </Button>
            <Button variant='contained' component={Link} href='/products/AddProductVariant/'>
              Add New Product Variant
            </Button>
          </Box>
          <DataGrid
            autoHeight
            rows={variantProducts}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default ViewList
