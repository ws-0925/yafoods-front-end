// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Icon from 'src/@core/components/icon'
import Button from '@mui/material/Button'

// import Switch from '@mui/material/Switch'
import { CardHeader } from '@mui/material'
import Divider from '@mui/material/Divider'

// ** Custom Table Components Imports
import { ProductVariantType } from 'src/types/apps/productType'
import { getVariantProducts } from 'src/store/apps/products'

// ** import Next
import Link from 'next/link'

// ** import Router
// import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'

interface CellType {
  row: ProductVariantType
}

const ManageVariantProducts = () => {
  // ** State
  const [pageSize, setPageSize] = useState<number>(10)
  const dispatch = useDispatch<AppDispatch>()

  // const router = useRouter()

  const variantProducts = useSelector((state: RootState) => state.products.variantProducts)

  useEffect(() => {
    dispatch(getVariantProducts())
  }, [dispatch])

  const RowOptions = ({ id }: { id: number }) => {
    return (
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ pr: 5 }}>
          <Icon icon='mdi:pencil-outline' fontSize={20} onClick={() => console.log(id)} />
        </Box>
        <Icon icon='mdi:delete-outline' fontSize={20} />
      </Box>
    )
  }

  const columns1 = [
    {
      flex: 0.3,
      minWidth: 230,
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
      renderCell: ({ row }: CellType) => <RowOptions id={row.product_variant_id.id} />
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ mt: 5 }}>
        <Card sx={{ mt: 15 }}>
          <CardHeader
            title='Manage Variant Product'
            sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
          />
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'right', flexWrap: 'wrap', alignItems: 'center', p: 5 }}>
            <Button variant='contained' component={Link} href='/products/AddProductVariant/'>
              Add New Product Variant
            </Button>
          </Box>
          <DataGrid
            autoHeight
            rows={variantProducts}
            columns={columns1}
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

export default ManageVariantProducts
