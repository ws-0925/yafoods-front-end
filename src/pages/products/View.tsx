// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Icon from 'src/@core/components/icon'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'

// ** Custom Table Components Imports
import { ProductType } from 'src/types/apps/productType'
import { Typography } from '@mui/material'

// ** import Next
import Link from 'next/link'

// ** import Router
import { useRouter } from 'next/router'

interface CellType {
  row: ProductType
}

interface viewDataType {
  totalActiveVariant: number
  totalInactiveVariant: number
}

const viewData: viewDataType = {
  totalActiveVariant: 137,
  totalInactiveVariant: 125
}

const product = [
  {
    id: 1,
    eName: 'Cooking Essentials',
    aName: '',
    productCategory: 'Cooking Essentials',
    status: 'active',
    image: '',
    eDescription: '',
    aDescription: '',
    barCode: '123515313',
    eUnit: 'unit 255',
    aUnit: '',
    quantity: 1,
    price: 1,
    vat: 1,
    channel: 'A',
    similarProduct: 'cooking'
  }
]

const ViewList = () => {
  // ** State
  const [pageSize, setPageSize] = useState<number>(10)

  const router = useRouter()

  // const { id } = router.query

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
      field: 'eName',
      headerName: 'Name',
      renderCell: ({ row }: CellType) => {
        const { eName } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{eName}</Box>
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'barCode',
      headerName: 'BarCode',
      renderCell: ({ row }: CellType) => {
        const { barCode } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{barCode}</Box>
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'eUnit',
      headerName: 'Unit',
      renderCell: ({ row }: CellType) => {
        const { eUnit } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{eUnit}</Box>
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'stock',
      headerName: 'Stock',
      renderCell: () => {
        return <Switch defaultChecked />
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {viewData && (
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#16B1FF', height: '100%' }}>
                <CardContent sx={{ py: theme => `${theme.spacing(4.125)} !important` }}>
                  <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                    Total Active Variant : {viewData.totalActiveVariant}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#d43b48', height: '100%' }}>
                <CardContent sx={{ py: theme => `${theme.spacing(4.125)} !important` }}>
                  <Typography variant='h5' sx={{ color: 'common.white', textAlign: 'center' }}>
                    Total Inactive Variant : {viewData.totalInactiveVariant}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} sx={{ mt: 5 }}>
        <Card sx={{ p: 5 }}>
          <Box sx={{ display: 'flex' }}>
            <Typography fontSize={20}>Product Group Name: {product[0].eName}</Typography>
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
            rows={product}
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

export default ViewList
