// ** React Imports
import { useState, MouseEvent } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface OrdersType {
  id: number
  city: string
  address: string
  date: string
}

interface CellType {
  row: OrdersType
}

const OrderList = () => {
  // ** State
  const [pageSize, setPageSize] = useState<number>(10)

  const RowOptions = ({ id }: { id: number | string }) => {
    console.log(id)

    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='mdi:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem
            component={Link}
            sx={{ '& svg': { mr: 2 } }}
            onClick={handleRowOptionsClose}
            href='/apps/user/view/overview/'
          >
            <Icon icon='mdi:eye-outline' fontSize={20} />
            View
          </MenuItem>
          <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='mdi:pencil-outline' fontSize={20} />
            Edit
          </MenuItem>
        </Menu>
      </>
    )
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: 'Order Id',
      renderCell: ({ row }: CellType) => {
        const { id } = row

        return <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>{id}</Box>
      }
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'city',
      headerName: 'City',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.city}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 220,
      field: 'address',
      headerName: 'Address',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.address}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'date',
      headerName: 'Date',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.date}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
    }
  ]

  const orders: OrdersType[] = [
    {
      id: 1,
      city: 'Riyadh',
      address: 'address-1',
      date: '2022-11-15'
    },
    {
      id: 2,
      city: 'Tabuk',
      address: 'address-2',
      date: '2022-12-15'
    },
    {
      id: 3,
      city: 'Jeddah',
      address: 'address-3',
      date: '2022-12-5'
    },
    {
      id: 4,
      city: 'Riyadh',
      address: 'address-4',
      date: '2022-10-15'
    },
    {
      id: 5,
      city: 'Dammam',
      address: 'address-5',
      date: '2022-11-15'
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="User's Order List" />
          <DataGrid
            autoHeight
            rows={orders}
            columns={columns}
            checkboxSelection
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

export default OrderList
